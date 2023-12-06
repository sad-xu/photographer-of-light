import { onMounted, onBeforeUnmount, ref } from 'vue';

/** 断点声明 同 mixin.scss */
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export default function useWidth() {
  const width = ref(window.innerWidth);

  const resizeFn = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', resizeFn);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeFn);
  });

  /** 实际宽度比断点小时，为true */
  const breakpointDown = (name: keyof typeof breakpoints) => {
    return width.value <= breakpoints[name];
  };

  /** 实际宽度比断点大时，为true */
  // const breakpointUp = (name: keyof typeof breakpoints) => {
  //   return width.value >= breakpoints[name];
  // };

  return {
    width,
    breakpointDown,
    // breakpointUp,
  };
}
