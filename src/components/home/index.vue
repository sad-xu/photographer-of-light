<template>
  <div class="home">
    <Transition name="fade">
      <video
        id="BgVideo"
        :key="bgUrl"
        class="bg-video"
        autoPlay
        loop
        muted
        playsinline
        webkit-playsinline
        :src="bgUrl"
      ></video>
    </Transition>
    <Transition name="fade" appear>
      <div class="title-wrapper" :class="{ 'title-wrapper-show': board.show }">
        <h1 class="title">光之摄影师</h1>
        <h3 class="sub-title">Photagrapher Of Light</h3>
      </div>
    </Transition>
    <Transition name="fade">
      <m-board
        v-if="breakpointDown('lg')"
        v-show="board.show"
        :board="board"
        :refreshLoading="refreshLoading"
        @refresh-random="refreshRandomList"
      >
      </m-board>
      <pc-board
        v-else
        v-show="board.show"
        :board="board"
        :refreshLoading="refreshLoading"
        @refresh-random="refreshRandomList"
      >
      </pc-board>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { BG_VIDEO_LIST } from '@/utils';
  import { mockRequest } from '@/api/album';
  import MBoard from './m-board.vue';
  import PcBoard from './pc-board.vue';
  import useWidth from '@/hooks/useWidth';
  import { mockPhotos } from '@/utils/mock';

  const { breakpointDown } = useWidth();
  const bgUrl = ref(BG_VIDEO_LIST[Math.floor(Math.random() * BG_VIDEO_LIST.length)].url);
  const board = reactive<any>({
    show: false,
    latest: [],
    likest: [],
    commentest: [],
    random: [],
  });
  const refreshLoading = ref(false);

  const generateRandomAlbums = () =>
    Array.from({ length: 10 }).map((_, i) => ({
      id: `id${Math.random()}`,
      name: `mock album${Math.round(Math.random() * 100)}`,
      userId: 'userid',
      userName: `用户${i}`,
      desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
      star: Math.round(Math.random() * 100),
      photoNum: 12,
      commentNum: 6,
      createTime: 1698843600,
      updateTime: 1699716600,
      type: 1,
      thumbnails: [...mockPhotos.map((v) => v.thumbnail), ...mockPhotos.map((v) => v.thumbnail)],
    }));

  onMounted(() => {
    document.addEventListener('WeixinJSBridgeReady', () => {
      const el = document.getElementById('BgVideo');
      console.log(el);
      (el as any).play();
    });

    mockRequest('').then((res) => {
      board.show = true;
      board.latest = generateRandomAlbums();
      board.likest = generateRandomAlbums();
      board.commentest = generateRandomAlbums();
      board.random = generateRandomAlbums();
    });
  });

  /** 刷新随机列表 */
  const refreshRandomList = () => {
    if (refreshLoading.value) return;
    refreshLoading.value = true;
    mockRequest('')
      .then((res) => {
        bgUrl.value = BG_VIDEO_LIST[Math.floor(Math.random() * BG_VIDEO_LIST.length)].url;
        board.random = generateRandomAlbums();
      })
      .finally(() => {
        refreshLoading.value = false;
      });
  };
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .bg-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 1.5s;
    pointer-events: none;
  }

  .title-wrapper {
    position: absolute;
    top: 50vh;
    left: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    transform: translateY(-50%);
    mix-blend-mode: difference;
    transition: all 0.7s;

    .title {
      color: #fff;
      font-size: 45px;
      font-family: cursive;
      transform: scale(1.5);
      transition: all 0.7s;
    }

    .sub-title {
      margin-top: 15px;
      color: #fff;
      font-size: 18px;
      font-family: EORZEA, sans-serif;
      transform: scale(1.5);
      transition: all 0.7s;
    }
  }

  .title-wrapper-show {
    top: 8vh;
    transform: translateY(0);

    .title,
    .sub-title {
      transform: scale(1);
    }

    .sub-title {
      margin-top: 0;
    }
  }
</style>
