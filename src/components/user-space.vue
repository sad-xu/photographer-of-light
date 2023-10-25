<template>
  <div class="user-space">
    <div class="avatar"></div>
    <div class="entrance">
      <div>相册</div>
      <div>喜欢</div>
      <div>消息</div>
      <div>退出</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .user-space {
    position: relative;

    .avatar {
      width: 40px;
      height: 40px;
      background-color: aqua;
      border-radius: 100%;
      cursor: pointer;
    }

    .entrance {
      position: absolute;
      top: 110%;
      left: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 10px;
      transform: translateY(-10px) translateX(-50%);
      opacity: 0;
      transition: opacity 0.3s, transform 0.3s;
      pointer-events: none;

      > div {
        width: 80px;
        text-align: center;
      }

      &:hover {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
        pointer-events: initial;
      }
    }

    &:hover {
      .entrance {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
        pointer-events: initial;
      }
    }
  }
</style>
