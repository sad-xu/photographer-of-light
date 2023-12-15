<template>
  <div class="pc-board">
    <div class="board">
      <board-list
        name="最新变动"
        sub-name="Latest"
        type="latest"
        :albumList="props.board.latest"
      ></board-list>
    </div>
    <div class="board">
      <board-list
        name="最多喜欢"
        sub-name="Likest"
        type="likest"
        :albumList="props.board.likest"
      ></board-list>
    </div>
    <div class="board">
      <board-list
        name="最多评论"
        sub-name="Commentest"
        type="commentest"
        :albumList="props.board.commentest"
      ></board-list>
    </div>
    <div class="board">
      <board-list name="随便看看" sub-name="Random" type="random" :albumList="props.board.random">
        <svg
          class="refresh-icon"
          :class="{ 'refresh-loading': props.refreshLoading }"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          @click="emits('refresh-random')"
        >
          <path
            d="M896 198.4 896 198.4l0 179.2 0 0c0 19.2-6.4 32-19.2 44.8-12.8 12.8-32 19.2-44.8 19.2l0 0-179.2 0 0 0c-19.2 0-32-6.4-44.8-19.2-25.6-25.6-25.6-64 0-89.6C620.8 320 633.6 313.6 652.8 313.6l0 0 25.6 0C627.2 275.2 576 256 518.4 256 441.6 256 377.6 281.6 332.8 332.8l0 0c-25.6 25.6-64 25.6-89.6 0-25.6-25.6-25.6-64 0-89.6l0 0C313.6 172.8 409.6 128 518.4 128c96 0 185.6 38.4 249.6 96L768 198.4l0 0c0-19.2 6.4-32 19.2-44.8 25.6-25.6 64-25.6 89.6 0C889.6 160 896 179.2 896 198.4zM416 691.2c-12.8 12.8-32 19.2-44.8 19.2l0 0L352 710.4C396.8 748.8 448 768 505.6 768c70.4 0 134.4-25.6 179.2-76.8l0 0c25.6-25.6 64-25.6 89.6 0 25.6 25.6 25.6 64 0 89.6l0 0C710.4 851.2 614.4 896 505.6 896c-96 0-185.6-38.4-249.6-96l0 32 0 0c0 19.2-6.4 32-19.2 44.8-25.6 25.6-64 25.6-89.6 0C134.4 864 128 844.8 128 825.6l0 0 0-179.2 0 0c0-19.2 6.4-32 19.2-44.8C160 588.8 172.8 582.4 192 582.4l0 0 179.2 0 0 0c19.2 0 32 6.4 44.8 19.2C441.6 627.2 441.6 665.6 416 691.2z"
          ></path>
        </svg>
      </board-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BoardList from './board-list.vue';

  const props = defineProps<{
    board: any;
    refreshLoading: boolean;
  }>();

  const emits = defineEmits<{
    (e: 'refresh-random'): void;
  }>();
</script>

<style lang="scss" scoped>
  .pc-board {
    position: absolute;
    top: calc(15vh + 50px);
    display: flex;
    height: 68vh;
    padding: 16px 0 12px 24px;
    background-color: #1e1e1e66;
    border-radius: 8px;
    backdrop-filter: blur(2px);

    .board {
      display: flex;
      flex-direction: column;
      width: 20vw;
      min-width: 150px;
      margin-right: 24px;
      border-right: 1px solid #eee;

      &:last-of-type {
        border-right: 0;
      }
    }
  }

  .refresh-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: all 0.3s;
    fill: #fff;

    &:hover {
      transform: scale(1.15) rotate(90deg);
      fill: #03a9f4;
    }
  }

  .refresh-loading {
    animation: rotate 1s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: scale(1.15) rotate(0);
    }

    100% {
      transform: scale(1.15) rotate(360deg);
    }
  }
</style>
