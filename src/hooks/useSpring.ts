import { Ref, ref } from 'vue';

type TaskCallback = (now: number) => boolean | void;
type TaskEntry = { c: TaskCallback; f: (v?: unknown) => void };

interface Spring<T> {
  set: (
    newVal: T,
    opts?: {
      hard?: boolean;
      soft?: boolean | number;
    }
  ) => Promise<unknown>;
  stiffness: number;
  damping: number;
  precision: number;
}

const tasks = new Set<TaskEntry>();

function run_tasks(now: number) {
  tasks.forEach((task) => {
    if (!task.c(now)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) window.requestAnimationFrame(run_tasks);
}

function loop(callback: TaskCallback) {
  let task: TaskEntry;
  if (tasks.size === 0) window.requestAnimationFrame(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      task = { c: callback, f: fulfill };
      tasks.add(task);
    }),
    abort() {
      tasks.delete(task);
    },
  };
}

function tick_spring<T>(
  ctx: {
    inv_mass: number;
    opts: Spring<T>;
    settled: boolean;
    dt: number;
  },
  last_value: T,
  current_value: T,
  target_value: T
): T {
  if (typeof current_value === 'number') {
    const delta = (target_value as number) - current_value;
    const velocity = (current_value - (last_value as number)) / (ctx.dt || 1 / 60);
    const spring = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      // 已稳定
      return target_value;
    } else {
      // 往复运动
      ctx.settled = false;
      return (current_value + d) as T;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map((_, i) =>
      tick_spring<any>(ctx, (last_value as any)[i], current_value[i], (target_value as any)[i])
    ) as T;
  } else if (typeof current_value === 'object') {
    const next_value = {};
    for (const k in current_value) {
      // @ts-ignore
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value as T;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}

/**
 * 弹簧运动函数
 * @param value
 * @param stiffness 0-1 数值越大效果越生硬 (灵敏度)
 * @param damping 0-1 数值越小阻尼越小（惯性）
 * @param precision 粒度 用于控制上面两个参数的运动幅度大小
 */
function spring<T>(
  value: T,
  setValue: (v: T) => void,
  { stiffness = 0.15, damping = 0.8, precision = 0.01 } = {}
): Spring<T> {
  let task: {
    promise: Promise<unknown>;
    abort(): void;
  } | null;
  let last_time: number;
  let last_value: T = value;
  let target_value: T = value;
  let current_token: object;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;

  const set = (
    newVal: T,
    opts: {
      hard?: boolean;
      soft?: boolean | number;
    } = {}
  ) => {
    target_value = newVal;
    current_token = {};
    const token = current_token;
    const { hard, soft } = opts;

    if (value == null || hard || (sp.stiffness >= 1 && sp.damping >= 1)) {
      // 无弹性
      cancel_task = true;
      last_time = window.performance.now();
      last_value = newVal;
      value = target_value;
      setValue(target_value);
      return Promise.resolve();
    } else if (soft) {
      const rate = soft === true ? 0.5 : soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = window.performance.now();
      cancel_task = false;
      task = loop((now) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: sp,
          settled: true,
          dt: ((now - last_time) * 60) / 1000,
        };

        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now;
        last_value = value;
        value = next_value;
        setValue(next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((resolve) => {
      task?.promise.then(() => {
        if (token === current_token) resolve(null);
      });
    });
  };

  const sp: Spring<T> = {
    set,
    stiffness,
    damping,
    precision,
  };
  return sp;
}

/**
 * 缓动hook
 * const {spVal, sp} = useSpring(0,{})
 * sp.stiffness = 0.5 // 修改参数
 * sp.set(newV) // 设置目标值
 */
export default function useSpring<T>(
  initVal: T,
  opts?: {
    stiffness?: number;
    damping?: number;
    precision?: number;
  }
) {
  const spVal = ref<T>(initVal) as Ref<T>;
  const sp = spring<T>(
    initVal,
    (v) => {
      spVal.value = v;
    },
    opts
  );
  return {
    spVal,
    sp,
  };
}
