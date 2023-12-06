<template>
  <div class="m-board">board</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .m-board {
    position: absolute;
    top: calc(10vh + 100px);
    display: flex;
    width: 80vw;
    height: 65vh;
    padding: 24px 12px;
    background-color: #1e1e1e66;
    border-radius: 8px;
    backdrop-filter: blur(2px);
  }

  @include media-breakpoint-down(sm) {
    .m-board {
      width: 90vw;
    }
  }
</style>
