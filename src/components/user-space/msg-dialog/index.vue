<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-show="props.visible" class="msg-dialog" @click="emits('backClick')">
        <div @click.stop="">
          <transition name="drawer">
            <KeepAlive>
              <msg-content v-if="props.visible" @select="(id) => emits('select', id)"></msg-content>
            </KeepAlive>
          </transition>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
  import { watch } from 'vue';
  import MsgContent from './msg-content.vue';

  const props = defineProps<{
    // 是否可见
    visible: boolean;
  }>();

  const emits = defineEmits<{
    // 点击背景
    (e: 'backClick'): void;
    // 跳转相册
    (e: 'select', albumId: string): void;
  }>();

  watch(
    () => props.visible,
    (v) => {
      if (v) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  );
</script>

<style lang="scss" scoped>
  .drawer-enter-active,
  .drawer-leave-active {
    transition: all 0.3s ease;
  }

  .drawer-enter-from,
  .drawer-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  .msg-dialog {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: #fff;
    background-color: rgb(0 0 0 / 20%);
    backdrop-filter: blur(15px);
  }
</style>
