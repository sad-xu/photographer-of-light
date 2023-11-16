<template>
  <div class="card-wrapper">
    <div
      id="card"
      class="interactive"
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
          @pointermove="handleInteract"
          @mouseout="handleInteractEnd"
          @wheel.prevent="handleWheel"
        >
          <!-- <img class="card__back" src="" alt="背面" loading="lazy" /> -->
          <div class="card__front">
            <!-- <img
            src="https://s.cn.bing.net/th?id=OHR.RomeView_ZH-CN5882212305_1920x1080.webp&qlt=50"
            loading="lazy"
            @load="handleLoadImg"
          /> -->
            <div
              ref="cardInnerEl"
              class="card-inner"
              :style="{
                filter: imgInfo.isLoading ? 'blur(20px)' : 'none',
              }"
            ></div>
            <div class="card__shine"></div>
            <div class="card__glare"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- setting -->
  <setting-part
    :setting="setting"
    :img-url="props.imgUrl"
    @scale-change="handleScaleChange"
  ></setting-part>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
  import useSpring from '@/hooks/useSpring';
  import errImg from '@/assets/err_img.png';
  import SettingPart from './setting-part.vue';

  const props = defineProps<{
    // 图片链接
    imgUrl: string;
    // 偏移
    offset: { x: number; y: number };
  }>();

  // 通知图片渲染尺寸 - 宽度
  const emits = defineEmits<{
    (e: 'renderSize', width: number): void;
  }>();

  const state = reactive({
    active: false,
    // 是否正在响应鼠标交互
    interacting: false,
  });

  const cardInnerEl = ref();
  const resizeTimeId = ref(0);
  const imgInfo = reactive({
    // 是否加载中
    isLoading: true,
    // 是否加载失败
    isFailed: false,
    originWidth: 0,
    originHeight: 0,
    width: 0,
    height: 0,
  });

  // 卡片配置
  const setting = reactive({
    scale: 1, // 缩放
  });

  onMounted(() => {
    loadImg({
      imgUrl: props.imgUrl,
      immediate: true,
      cb: () => {},
    });
    window.addEventListener('resize', resizeCard);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCard);
  });

  watch(
    () => props.imgUrl,
    (url) => {
      if (!url) return;
      imgInfo.isLoading = true;
      imgInfo.isFailed = false;
      loadImg({ imgUrl: url });
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
    const t1 = +new Date();
    const imgEl = new Image();
    imgEl.src = imgUrl;
    imgEl.draggable = false;
    imgInfo.originWidth = 300;
    imgInfo.originHeight = 300;
    imgEl.onload = () => {
      // 至少延时300ms
      const dt = immediate ? 0 : 300 - (+new Date() - t1);
      setTimeout(
        () => {
          if (imgUrl == props.imgUrl) {
            imgInfo.originWidth = imgEl.width;
            imgInfo.originHeight = imgEl.height;
            imgInfo.isLoading = false;
            resizeCard();
            cardInnerEl.value.innerHTML = '';
            cardInnerEl.value.appendChild(imgEl);
            cb ? cb() : null;
          }
        },
        dt < 0 ? 0 : dt
      );
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
    if (resizeTimeId.value != 0) return;
    resizeTimeId.value = window.requestAnimationFrame(() => {
      // 根据原始尺寸和屏幕尺寸，计算等比缩放后的尺寸
      const maxWidth = window.innerWidth * 0.7;
      const maxHeight = window.innerHeight - 200;

      const wRatio = maxWidth / imgInfo.originWidth;
      const hRatio = maxHeight / imgInfo.originHeight;

      const scale = Math.min(wRatio, hRatio);
      imgInfo.width = imgInfo.originWidth * scale;

      imgInfo.height = imgInfo.originHeight * scale;
      emits('renderSize', imgInfo.width);
      resizeTimeId.value = 0;
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

  /** 鼠标在卡上移动 */
  const handleInteract = (e: PointerEvent) => {
    state.interacting = true;
    const el = e.target as HTMLElement;
    // TODO: 缓存尺寸数据
    const rect = el.getBoundingClientRect();
    // 触发点在卡片内的位置百分比
    const percent = {
      x: clamp(((e.clientX - rect.left) * 100) / rect.width),
      y: clamp(((e.clientY - rect.top) * 100) / rect.height),
    };
    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    spRotate.stiffness = springInteractSettings.stiffness;
    spRotate.damping = springInteractSettings.damping;
    spRotate.set({
      x: -(center.x / 3.5),
      y: center.y / 2,
    });
    spGlare.stiffness = springInteractSettings.stiffness;
    spGlare.damping = springInteractSettings.damping;
    spGlare.set({
      x: percent.x,
      y: percent.y,
      o: 1,
    });
    spBackground.stiffness = springInteractSettings.stiffness;
    spBackground.damping = springInteractSettings.damping;
    spBackground.set({
      x: adjust(percent.x, 0, 100, 37, 63),
      y: adjust(percent.y, 0, 100, 33, 67),
    });
  };

  /** 移出卡片 */
  const handleInteractEnd = (e: any, delay = 500) => {
    window.setTimeout(() => {
      const snapStiff = 0.01;
      const snapDamp = 0.06;
      state.interacting = false;

      spRotate.stiffness = snapStiff;
      spRotate.damping = snapDamp;
      spRotate.set(
        {
          x: 0,
          y: 0,
        },
        { soft: 1 }
      );

      spGlare.stiffness = snapStiff;
      spGlare.damping = snapDamp;
      spGlare.set(
        {
          x: 50,
          y: 50,
          o: 0,
        },
        { soft: 1 }
      );

      spBackground.stiffness = snapStiff;
      spBackground.damping = snapDamp;
      spBackground.set(
        {
          x: 50,
          y: 50,
        },
        { soft: 1 }
      );
    }, delay);
  };

  /** 滚轮缩放 [0.2, 3.0] */
  const handleWheel = (e: WheelEvent) => {
    handleScaleChange(e.deltaY * -0.001);
  };

  /** 手动调整缩放 */
  const handleScaleChange = (v: number) => {
    const s = Math.min(Math.max(setting.scale + v, 0.2), 3);
    setting.scale = +`${Math.round(s * 10) / 10}`.slice(0, 3);
  };
</script>

<style lang="scss" scoped>
  .card-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #card {
    z-index: 19;
    transition: width 0.3s, height 0.3s;
    user-select: none;

    .card__shine {
      --shift: 1px;
      --imgsize: cover;

      background-image: var(--glitter), var(--glitter),
        conic-gradient(
          var(--sunpillar-clr-4),
          var(--sunpillar-clr-5),
          var(--sunpillar-clr-6),
          var(--sunpillar-clr-1),
          var(--sunpillar-clr-4)
        ),
        radial-gradient(
          farthest-corner circle at var(--pointer-x) var(--pointer-y),
          hsl(150deg 0% 0% / 98%) 10%,
          hsl(0deg 0% 95% / 15%) 90%
        );
      background-position: 45% 45%, 55% 55%, center center, center center;
      background-size: var(--glittersize) var(--glittersize), var(--glittersize) var(--glittersize),
        cover, cover;
      background-blend-mode: soft-light, hard-light, overlay;
      filter: brightness(calc(0.4 + (var(--pointer-from-center) * 0.2))) contrast(1) saturate(2.7);
      mix-blend-mode: color-dodge;

      &::before {
        background-image: var(--foil),
          linear-gradient(45deg, hsl(46deg 95% 50%), hsl(52deg 100% 69%)),
          radial-gradient(
            farthest-corner circle at var(--pointer-x) var(--pointer-y),
            hsl(10deg 20% 90% / 95%) 10%,
            hsl(0deg 0% 0%) 70%
          );
        background-position: center center, center center, center center;
        background-size: var(--imgsize), cover, cover;
        background-blend-mode: hard-light, multiply;
        opacity: 0.8;
        filter: brightness(1.25) contrast(1.25) saturate(0.35);
        mix-blend-mode: lighten;
        content: '';
        mask-image: none !important;
      }

      &::after {
        background-image: var(--glitter);
        background-position: calc(
            50% - ((var(--shift) * 2) * var(--pointer-from-left)) + var(--shift)
          )
          calc(50% - ((var(--shift) * 2) * var(--pointer-from-top)) + var(--shift));
        background-size: var(--glittersize) var(--glittersize);
        filter: brightness(calc((var(--pointer-from-center) * 0.6) + 0.6)) contrast(1.5);
        mix-blend-mode: overlay;
        content: '';
        mask-image: none !important;
      }
    }

    .card__glare {
      background-image: radial-gradient(
        farthest-corner circle at var(--pointer-x) var(--pointer-y),
        hsl(45deg 8% 80% / 30%) 0%,
        hsl(22deg 15% 12%) 180%
      );
      filter: brightness(1.3) contrast(1.5);
      mix-blend-mode: hard-light;
    }
  }
</style>
