<template>
  <div class="layout">
    <header>
      <user-space></user-space>
    </header>
    <main>
      <Transition name="fade" mode="out-in" appear>
        <preview-album></preview-album>
      </Transition>
    </main>
    <footer>
      <div>光之摄影师 v0.1.0-dev</div>
      <div>Made with <span class="heart">❤</span></div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
  import UserSpace from './components/user-space.vue';
  import PreviewAlbum from './components/preview-album.vue';
</script>

<style lang="scss" scoped>
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

  .layout {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  header {
    position: fixed;
    top: 4px;
    right: 4px;
    z-index: 2;
  }

  main {
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }

  footer {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 4px 4px;
    color: #bbb;
    font-size: 12px;

    .heart {
      color: #e91e63;
      animation: beating-heart 30s linear 5s infinite;
    }
  }

  @keyframes beating-heart {
    0% {
      transform: scale(1);
    }

    1% {
      transform: scale(1.5);
    }

    2% {
      transform: scale(0.95);
    }

    3% {
      transform: scale(1);
    }

    4% {
      transform: scale(1.5);
    }

    5% {
      transform: scale(0.95);
    }

    6% {
      transform: scale(1);
    }
  }
</style>
