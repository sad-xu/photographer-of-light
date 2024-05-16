<template>
  <div
    class="card-wrapper"
    :style="{ transform: `translate(-50%, -50%) rotate(${imgInfo.rotate}deg)` }"
  >
    <div
      id="card"
      :class="{
        active: state.active,
        interacting: state.interacting,
      }"
      :style="{
        '--pointer-x': `${springGlare.x}%`,
        '--pointer-y': `${springGlare.y}%`,
        '--pointer-from-center': clamp(
          Math.sqrt(
            (springGlare.y - 50) * (springGlare.y - 50) +
              (springGlare.x - 50) * (springGlare.x - 50)
          ) / 50,
          0,
          1
        ),
        '--pointer-from-top': springGlare.y / 100,
        '--pointer-from-left': springGlare.x / 100,
        '--card-opacity': springGlare.o,
        '--rotate-x': `${springRotate.x + springRotateDelta.x}deg`,
        '--rotate-y': `${springRotate.y + springRotateDelta.y}deg`,
        '--background-x': `${springBackground.x}%`,
        '--background-y': `${springBackground.y}%`,
        '--card-scale': springScale,
        '--translate-x': `${springTranslate.x}px`,
        '--translate-y': `${springTranslate.y}px`,
        'width': `${imgInfo.width * setting.scale}px`,
        'height': `${imgInfo.height * setting.scale}px`,
        'transform': `translate(${props.offset.x / 2}px,${props.offset.y / 2}px)`,
      }"
    >
      <div class="card__translater">
        <div
          class="card__rotator"
          @touchmove="handleTouchMove"
          @touchend="() => resetCard()"
          @mousemove="handleMouseMove"
          @mouseout="() => resetCard()"
          @wheel.prevent="handleWheel"
        >
          <div class="card__front">
            <div
              ref="cardInnerEl"
              class="card-inner"
              :style="{
                filter: imgInfo.isLoading ? 'blur(20px)' : 'none',
              }"
            ></div>
            <div class="card__shine" :class="props.setting.shine"></div>
            <div class="card__glare" :class="props.setting.glare"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
  import useSpring from '@/hooks/useSpring';
  import errImg from '@/assets/err_img.png';
  import { CardSetting } from './index.vue';
  import { isTouchDevice } from '@/utils';

  const props = defineProps<{
    // 图片链接
    imgUrl: string;
    // 图片尺寸
    imgWidth: number;
    imgHeight: number;
    // 偏移
    offset: { x: number; y: number };
    setting: CardSetting;
  }>();

  // 通知图片渲染尺寸 - 宽度
  const emits = defineEmits<{
    (e: 'loaded'): void;
    (e: 'scaleChange', scale: number): void;
  }>();

  const state = reactive({
    active: false,
    // 是否正在响应鼠标交互
    interacting: false,
  });

  const cardInnerEl = ref();
  const imgInfo = reactive({
    // 是否加载中
    isLoading: true,
    // 是否加载失败
    isFailed: false,
    originWidth: 0,
    originHeight: 0,
    width: 0,
    height: 0,
    rotate: 0,
  });

  // 卡片rect 缓存
  let rect: DOMRect | null;
  // 尺寸变化标记
  let resizeTimeId = 0;

  onMounted(() => {
    loadImg({
      imgUrl: props.imgUrl,
      immediate: true,
      cb: () => {},
    });
    window.addEventListener('resize', resizeCard);
    if (isTouchDevice) {
      const deviceOrient = window.DeviceOrientationEvent as any;
      console.log(deviceOrient, deviceOrient?.requestPermission);
      if (deviceOrient && deviceOrient.requestPermission) {
        deviceOrient.requestPermission().then((res: any) => {
          console.log(res);
          // if (res === 'granted') {
          window.addEventListener('devicemotion', handleDeviceMotion);
          // }
        });
      } else {
        window.addEventListener('devicemotion', handleDeviceMotion);
      }
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCard);
    if (isTouchDevice) {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    }
  });

  watch(
    () => props.imgUrl,
    (url) => {
      if (!url) return;
      imgInfo.isLoading = true;
      imgInfo.isFailed = false;
      const r = (imgInfo.rotate / 90) % 4;
      if (r === 1) {
        imgInfo.rotate -= 90;
      } else if (r === 2) {
        imgInfo.rotate -= 180;
      } else if (r === 3) {
        imgInfo.rotate += 90;
      }
      loadImg({ imgUrl: url });
    }
  );

  watch(
    () => props.setting.scale,
    () => {
      console.log('scale');
      rect = null;
    }
  );

  /** 加载图片 */
  const loadImg = ({
    imgUrl,
    immediate = false,
    cb,
  }: {
    imgUrl: string;
    immediate?: boolean;
    cb?: () => void;
  }) => {
    if (!imgUrl) return;
    // const t1 = +new Date();
    const imgEl = new Image();
    imgEl.src = imgUrl;
    imgEl.draggable = false;
    imgInfo.originWidth = props.imgWidth;
    imgInfo.originHeight = props.imgHeight;
    imgEl.onload = () => {
      // 至少延时300ms
      // const dt = immediate ? 0 : 300 - (+new Date() - t1);
      // setTimeout(
      //   () => {
      if (imgUrl == props.imgUrl) {
        imgInfo.originWidth = imgEl.width;
        imgInfo.originHeight = imgEl.height;
        imgInfo.isLoading = false;
        resizeCard();
        emits('loaded');
        cardInnerEl.value.innerHTML = '';
        cardInnerEl.value.appendChild(imgEl);
        cb ? cb() : null;
      }
      // },
      // dt < 0 ? 0 : dt
      // );
    };
    imgEl.onerror = () => {
      if (imgUrl == props.imgUrl) {
        imgEl.src = errImg;
        imgInfo.isLoading = false;
        imgInfo.isFailed = true;
      }
    };
  };

  /** 尺寸变化 */
  const resizeCard = () => {
    if (resizeTimeId != 0) return;
    rect = null;
    resizeTimeId = window.requestAnimationFrame(() => {
      // 根据原始尺寸和屏幕尺寸，计算等比缩放后的尺寸
      const maxWidth = window.innerWidth * 0.7;
      const maxHeight = window.innerHeight - 200;

      const isRotate = (imgInfo.rotate / 90) % 2;
      const wRatio = maxWidth / (isRotate ? imgInfo.originHeight : imgInfo.originWidth);
      const hRatio = maxHeight / (isRotate ? imgInfo.originWidth : imgInfo.originHeight);

      const scale = Math.min(wRatio, hRatio);
      imgInfo.width = imgInfo.originWidth * scale;
      imgInfo.height = imgInfo.originHeight * scale;
      resizeTimeId = 0;
    });
  };

  const springInteractSettings = { stiffness: 0.066, damping: 0.25 };
  const springPopoverSettings = { stiffness: 0.033, damping: 0.45 };
  // 运动相关参数
  const { spVal: springRotate, sp: spRotate } = useSpring({ x: 0, y: 0 }, springInteractSettings);
  const { spVal: springGlare, sp: spGlare } = useSpring(
    { x: 0, y: 0, o: 0 },
    springInteractSettings
  );
  const { spVal: springBackground, sp: spBackground } = useSpring(
    { x: 50, y: 0 },
    springInteractSettings
  );
  const { spVal: springRotateDelta, sp: spRotateDelta } = useSpring(
    { x: 0, y: 0 },
    springPopoverSettings
  );
  const { spVal: springTranslate, sp: spTranslate } = useSpring(
    { x: 0, y: 0 },
    springPopoverSettings
  );
  const { spVal: springScale, sp: spScale } = useSpring(1, springPopoverSettings);

  document.addEventListener('visibilitychange', () => {
    // 不可见时，清除运动状态
    if (document.visibilityState !== 'visible') {
      spScale.set(1, { hard: true });
      spTranslate.set({ x: 0, y: 0 }, { hard: true });
      spRotateDelta.set({ x: 0, y: 0 }, { hard: true });
      spRotate.set({ x: 0, y: 0 }, { hard: true });
      spGlare.set({ x: 0, y: 0, o: 0 }, { hard: true });
    }
  });

  /** 限制最大最小值 */
  const clamp = (val: number, min = 0, max = 100) => {
    return Math.min(Math.max(val, min), max);
  };

  /** 根据指定范围映射新值 */
  const adjust = (val: number, fromMin: number, fromMax: number, toMin: number, toMax: number) => {
    return toMin + ((toMax - toMin) * (val - fromMin)) / (fromMax - fromMin);
  };

  /** 鼠标在卡上移动 触发点在卡片上的位置百分比 随旋转角度变化 */
  const handleInteract = (_x: number, _y: number) => {
    let cx = _x - 50;
    let cy = _y - 50;
    let x = cx;
    let y = cy;
    const r = (imgInfo.rotate / 90) % 4;
    // 转轴公式
    if (r === 1) {
      x = cy;
      y = -cx;
    } else if (r === 2) {
      x = -cx;
      y = -cy;
    } else if (r === 3) {
      x = -cy;
      y = cx;
    }
    x += 50;
    y += 50;
    state.interacting = true;
    const center = { x: x - 50, y: y - 50 };
    spRotate.stiffness = springInteractSettings.stiffness;
    spRotate.damping = springInteractSettings.damping;
    spRotate.set({
      x: -(center.x / 3.5),
      y: center.y / 2,
    });
    spGlare.stiffness = springInteractSettings.stiffness;
    spGlare.damping = springInteractSettings.damping;
    spGlare.set({
      x: x,
      y: y,
      o: 1,
    });
    spBackground.stiffness = springInteractSettings.stiffness;
    spBackground.damping = springInteractSettings.damping;
    spBackground.set({
      x: adjust(x, 0, 100, 37, 63),
      y: adjust(y, 0, 100, 33, 67),
    });
  };

  /** touch move */
  const handleTouchMove = (e: TouchEvent) => {
    const el = e.target as HTMLElement;
    if (!rect) {
      rect = el.getBoundingClientRect();
    }
    const touch = e.touches[0];
    if (touch) {
      handleInteract(
        clamp(((touch.clientX - rect.left) * 100) / rect.width),
        clamp(((touch.clientY - rect.top) * 100) / rect.height)
      );
    }
  };

  /** mouse move */
  const handleMouseMove = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    if (!rect) {
      rect = el.getBoundingClientRect();
    }
    handleInteract(
      clamp(((e.clientX - rect.left) * 100) / rect.width),
      clamp(((e.clientY - rect.top) * 100) / rect.height)
    );
  };

  let timeId = 0;

  /** 陀螺仪 速度 TODO:真机测试 */
  const handleDeviceMotion = (e: DeviceMotionEvent) => {
    const now = +new Date();
    timeId = now;
    const rotationRate = e.rotationRate;
    console.log('rotationRate', e);
    if (rotationRate?.beta === null) return;
    handleInteract(clamp(rotationRate?.gamma || 50), clamp(rotationRate?.beta || 50));
    setTimeout(() => {
      if (timeId === now) {
        resetCard(0);
      }
    }, 500);
  };

  /** 移出 卡片复位 */
  const resetCard = (delay = 500) => {
    window.setTimeout(() => {
      const snapStiff = 0.01;
      const snapDamp = 0.06;
      state.interacting = false;

      spRotate.stiffness = snapStiff;
      spRotate.damping = snapDamp;
      spRotate.set({ x: 0, y: 0 }, { soft: 1 });

      spGlare.stiffness = snapStiff;
      spGlare.damping = snapDamp;
      spGlare.set({ x: 50, y: 50, o: 0 }, { soft: 1 });

      spBackground.stiffness = snapStiff;
      spBackground.damping = snapDamp;
      spBackground.set({ x: 50, y: 50 }, { soft: 1 });
    }, delay);
  };

  /** 滚轮缩放 [0.2, 3.0] */
  const handleWheel = (e: WheelEvent) => {
    emits('scaleChange', e.deltaY * -0.001);
  };

  /** 旋转90° + 调整尺寸 - 外部调用 */
  const rotateCard = () => {
    imgInfo.rotate = imgInfo.rotate + 90;
    resizeCard();
  };

  defineExpose({
    rotateCard,
  });
</script>

<style lang="scss" scoped>
  .card-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transition: transform 0.3s;
  }
</style>
