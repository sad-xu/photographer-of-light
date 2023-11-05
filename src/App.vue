<template>
  <div class="layout">
    <header>
      <div @click="openSearchDialog" class="search-button">搜索</div>
      <user-space></user-space>
    </header>
    <main>
      <Transition name="fade" mode="out-in" appear>
        <preview-album :album-id="'1'"></preview-album>
      </Transition>
      <x-dialog v-model:visible="searchVisible">
        <search-dialog></search-dialog>
      </x-dialog>
    </main>
    <footer>
      <div @click="showMsg">光之摄影师 v0.1.0-dev</div>
      <div>Made with <span class="heart">❤</span></div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import XDialog from './common/x-dialog.vue';
  import UserSpace from './components/user-space.vue';
  import PreviewAlbum from './components/preview-album.vue';
  import SearchDialog from './components/search-dialog.vue';
  import createMessage from './common/message.ts';

  const searchVisible = ref(false);

  /** 打开搜索 */
  const openSearchDialog = () => {
    searchVisible.value = true;
  };

  const showMsg = () => {
    console.log('11');
    createMessage('message', 'success', 3000);
  };
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
    display: flex;
    align-items: center;

    .search-button {
      margin-right: 8px;
      cursor: pointer;
    }
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
      display: inline-block;
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
