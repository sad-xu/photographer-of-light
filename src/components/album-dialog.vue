<template>
  <div class="album-dialog">
    {{ props.type }}
    <div class="album" v-for="i in 20" :key="i">
      <div>相册名{{ i }}</div>
      <div>desc</div>
      <div>作者 点赞</div>
    </div>
    <div style="height: 10vh"></div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    type: String,
  });
</script>

<style lang="scss" scoped>
  .album-dialog {
    padding-bottom: 30vh;

    .album {
      width: 600px;
      margin-bottom: 20px;
      padding: 12px;
      border: 1px solid #333;
    }
  }
</style>
