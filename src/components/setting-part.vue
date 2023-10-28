<template>
  <div class="setting-part">
    <div class="setting" v-for="i in 5" :key="i">
      <div class="radio"></div>
      <span>setting</span>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .setting-part {
    display: flex;
    flex-direction: column;
    width: 80px;
    opacity: 0.3;
    transition: all 0.3s;

    &:hover {
      opacity: 1;
    }

    .setting {
      display: flex;
      align-items: center;
      padding: 3px 0;
      cursor: pointer;

      .radio {
        width: 14px;
        height: 14px;
        margin-right: 4px;
        background-color: #eee;
        border-radius: 100%;
      }
    }
  }
</style>
