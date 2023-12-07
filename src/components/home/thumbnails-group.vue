<template>
  <div class="thumbnail-wrapper">
    <div
      v-for="i in num"
      :key="i"
      class="thumbnail"
      :style="{
        zIndex: maxNum + 1 - i,
        backgroundImage: `url(${props.thumbnails[i - 1]})`,
      }"
    ></div>
    <div v-if="moreNum > 0" class="thumbnail">
      <span class="more-num">+{{ moreNum }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps<{
    thumbnails: string[];
    photoNum: number;
  }>();

  // n + 1
  const maxNum = 5;
  const num = computed(() => Math.min(maxNum, props.thumbnails.length));
  const moreNum = computed(() => {
    return props.photoNum <= maxNum ? 0 : props.photoNum - maxNum;
  });
</script>

<style lang="scss" scoped>
  .thumbnail-wrapper {
    display: flex;

    .thumbnail {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      margin-left: -5px;
      background-color: rgb(51 51 51 / 50%);
      border: 1px solid #121212;
      border-radius: 100%;
    }

    .more-num {
      font-size: 12px;
      transform: scale(0.8);
    }
  }
</style>
