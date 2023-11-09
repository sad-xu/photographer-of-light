<template>
  <div class="loading">
    <img class="loading-inner" alt="loading" src="@/assets/tataru-loading.gif" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .loading {
    display: flex;
    justify-content: center;

    .loading-inner {
      width: 200px;
      height: 195px;
    }
  }
</style>
