<template>
  <header>
    <div class="header-content">
      <span> LOGO </span>
      <slot></slot>
      <div>QQ avatar</div>
    </div>
    <div class="header-block"></div>
  </header>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  header {
    .header-content {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 9;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      padding: 0 20px;
      background-color: #37474f;
      transition: height 0.3s;
    }

    .header-block {
      height: 60px;
      transition: height 0.3s;
    }
  }
</style>
