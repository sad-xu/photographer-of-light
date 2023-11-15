<template>
  <div class="home">
    <!-- <video
      class="bg-video"
      :style="{
        opacity: videoOpacity,
      }"
      autoPlay
      loop
      muted
      :src="bgUrl"
      @loadeddata="videoOpacity = 1"
    ></video> -->
    <h1>标题标题标</h1>
    <div v-show="board.show" class="home-content">
      <div class="board">
        <board-list name="最新变动" type="latest" :albumList="board.latest"></board-list>
      </div>
      <div class="board">
        <board-list name="最多喜欢" type="likest" :albumList="board.likest"></board-list>
      </div>
      <div class="board">
        <board-list name="最多评论" type="commentest" :albumList="board.commentest"></board-list>
      </div>
      <div class="board">
        <board-list name="随便看看" type="random" :albumList="board.random"></board-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { BG_VIDEO_LIST } from '@/utils';
  import { mockRequest } from '@/api/album';
  import BoardList from './board-list.vue';

  const videoOpacity = ref(0);
  const bgUrl = BG_VIDEO_LIST[Math.floor(Math.random() * BG_VIDEO_LIST.length)].url;
  const board = reactive<any>({
    show: false,
    latest: [],
    likest: [],
    commentest: [],
    random: [],
  });

  const generateRandomAlbums = () =>
    Array.from({ length: 10 }).map((_, i) => ({
      id: `id${i}`,
      name: `mock album${i}`,
      userId: 'userid',
      userName: `用户${i}`,
      desc: 'descdesc',
      star: Math.round(Math.random() * 100),
      photoNum: 12,
      commentNum: 6,
      createTime: 1698843600,
      updateTime: 1699716600,
      tags: [],
    }));

  onMounted(() => {
    console.log('mounted');
    mockRequest('').then((res) => {
      board.show = true;
      board.latest = generateRandomAlbums();
      board.likest = generateRandomAlbums();
      board.commentest = generateRandomAlbums();
      board.random = generateRandomAlbums();
    });
  });
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

  h1 {
    position: relative;
    margin-top: 10vh;
    margin-bottom: 36px;
    color: #fff;
    mix-blend-mode: difference;
  }

  .home-content {
    display: flex;
    height: 60vh;
    padding: 24px 0;
    background-color: #1e1e1e33;
    border-radius: 8px;
    backdrop-filter: blur(3px);

    .board {
      display: flex;
      flex-direction: column;
      width: 20vw;
      min-width: 150px;
      margin-right: 24px;
      padding-left: 24px;
      border-right: 1px solid #eee;

      &:last-of-type {
        border-right: 0;
      }
    }
  }
</style>
