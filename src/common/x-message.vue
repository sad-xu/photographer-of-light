<template>
  <Transition name="msg" mode="out-in" appear @after-leave="handleAfterLeave">
    <div class="msg" :class="classObject" v-show="isVisible">
      <span>{{ msg }}</span>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { MessageType } from './message';

  const props = defineProps({
    msg: String,
    type: String as PropType<MessageType>,
    onDestroy: Function,
  });

  const isVisible = ref(true);
  const classObject = {
    'msg-success': props.type === 'success',
    'msg-error': props.type === 'error',
    'msg-warning': props.type === 'warning',
  };

  const close = () => {
    isVisible.value = false;
  };

  // 过渡结束，销毁
  const handleAfterLeave = () => {
    props.onDestroy!();
  };

  defineExpose({
    close,
  });
</script>

<style lang="scss" scoped>
  .msg-enter-from,
  .msg-leave-to {
    transform: translate(-50%, -30px) scale(0) !important;
    opacity: 0;
  }

  .msg {
    position: fixed;
    top: 36px;
    left: 50%;
    z-index: 101;
    padding: 8px 12px;
    color: #fff;
    font-size: 14px;
    border-radius: 10px;
    box-shadow: 0 0 6px #575757;
    transform: translateX(-50%) scale(1);
    transition: all 0.3s;
  }

  .msg-success {
    color: #4caf50;
    background-color: #c8e6c9;
  }

  .msg-warning {
    color: #ff9800;
    background-color: #ffe0b2;
  }

  .message-error {
    color: #e91e63;
    background-color: #f8bbd0;
  }
</style>
