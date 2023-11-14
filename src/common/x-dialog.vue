<template>
  <Teleport to="body">
    <div v-if="value && !hideClose" class="ky-dialog-close-btn" @click="handleClose">
      <svg
        class="close-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#FFF"
      >
        <path
          d="M512 451.669333l225.834667-225.834666a42.666667 42.666667 0 0 1 60.330666 60.330666l-512 512a42.666667 42.666667 0 1 1-60.330666-60.330666L451.669333 512 225.834667 286.165333a42.666667 42.666667 0 0 1 60.330666-60.330666L512 451.669333z m76.501333 197.162667a42.666667 42.666667 0 0 1 60.330667-60.330667l149.333333 149.333334a42.666667 42.666667 0 0 1-60.330666 60.330666l-149.333334-149.333333z"
        ></path>
      </svg>
    </div>
    <transition name="dialog-fade">
      <div v-show="value" class="ky-dialog" :style="innerStyle">
        <template v-if="keepAlive">
          <slot></slot>
        </template>
        <template v-else>
          <slot v-if="contentVisible"></slot>
        </template>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
  import { StyleValue, computed, ref, watch } from 'vue';

  const props = defineProps<{
    // 是否可见 v-model:visible
    visible: boolean;
    // 是否隐藏右上角
    hideClose?: boolean;
    // custom style
    innerStyle?: StyleValue;
    // keep-alive
    keepAlive?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:visible', v: boolean): void;
  }>();

  const contentVisible = ref(false);

  const value = computed({
    get() {
      return props.visible;
    },
    set(v) {
      emit('update:visible', v);
    },
  });

  watch(
    () => props.visible,
    (v) => {
      if (v) {
        contentVisible.value = v;
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        window.setTimeout(() => {
          contentVisible.value = v;
        }, 300);
      }
    }
  );

  const handleClose = () => {
    value.value = false;
  };
</script>

<style lang="scss" scoped>
  .dialog-fade-enter-active,
  .dialog-fade-leave-active {
    transition: opacity 0.3s;
  }

  .dialog-fade-enter-from,
  .dialog-fade-leave-to {
    opacity: 0;
  }

  .ky-dialog-close-btn {
    position: fixed;
    top: 64px;
    right: 64px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    color: #fff;
    background-color: #484848;
    border-radius: 100%;
    transform: rotate(0deg);
    cursor: pointer;
    transition: opacity 0.3s, transform 0.3s;

    .close-icon {
      width: 32px;
      height: 32px;
    }

    &:hover {
      transform: rotate(90deg);
      opacity: 0.8;
    }
  }

  .ky-dialog {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    padding-top: 30vh;
    overflow: auto;
    color: #fff;
    background-color: rgb(0 0 0 / 60%);
    backdrop-filter: blur(15px);
    scrollbar-width: thin;
    scrollbar-color: #686868 rgb(0 0 0 / 20%);

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgb(0 0 0 / 20%);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #686868;
      border-radius: 4px;

      &:hover {
        background-color: rgb(144 147 153 / 50%);
      }
    }
  }
</style>
