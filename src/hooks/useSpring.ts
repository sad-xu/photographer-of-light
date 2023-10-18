import { spring } from '@/utils';
import { Ref, ref } from 'vue';

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
