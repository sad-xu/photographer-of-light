<template>
  <div class="layout">
    <main>
      <Transition name="fade" mode="out-in" appear>
        <preview-album></preview-album>
      </Transition>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import PreviewAlbum from './components/preview-album.vue';
</script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  main {
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }

  // 切换显示|编辑
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
</style>
