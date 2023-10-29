<template>
  <Transition name="msg-fade" mode="out-in" appear>
    <div class="msg" :class="classObject" v-if="isVisible">
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
  import { onUnmounted, PropType, ref } from 'vue';
  export type MessageType = 'success' | 'error' | 'default';

  const props = defineProps({
    message: String,
    type: String as PropType<MessageType>,
  });

  const isVisible = ref(true);
  const classObject = {
    'alert-success': props.type === 'success',
    'alert-danger': props.type === 'error',
    'alert-primary': props.type === 'default',
  };

  onUnmounted(() => {
    console.log('destory');
  });
</script>

<style lang="scss" scoped>
  // 切换显示|编辑
  // .msg-fade-enter-active,
  // .msg-fade-leave-active {
  // }

  .msg-fade-enter-from,
  .msg-fade-leave-to {
    opacity: 0;
  }

  .msg {
    position: fixed;
    top: 50px;
    left: 50%;
    z-index: 101;
    padding: 10px;
    background-color: red;
    transform: translateX(-50%);
    transition: all 0.3s;
  }
</style>
