<template>
  <div class="album-pagination">
    <div class="left-arrow arrow" @click="() => togglePhoto(-1)">👈</div>
    <div class="dot-wrapper">
      <div
        v-for="(photo, index) in photoList"
        :key="index"
        class="dot"
        :style="{ backgroundImage: `url(${photo.thumbnail})` }"
        :class="index === props.defaultIndex ? 'dot-selected' : ''"
        @click="() => emit('change', index)"
      ></div>
    </div>
    <div class="right-arrow arrow" @click="() => togglePhoto(1)">👉</div>
  </div>
</template>

<script lang="ts" setup>
  import { Photo } from '@/api/types';

  const props = defineProps<{
    // 图片列表
    photoList: Photo[];
    // 当前index
    defaultIndex: number;
  }>();

  const emit = defineEmits<{
    (e: 'change', v: number): void;
  }>();

  /** 切换上/下一张 */
  const togglePhoto = (n: number) => {
    let v = props.defaultIndex + n;
    if (v < 0) {
      v = 0;
    } else if (v >= props.photoList.length) {
      v = props.photoList.length - 1;
    }
    return emit('change', v);
  };
</script>

<style lang="scss" scoped>
  .album-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    .arrow {
      width: 30px;
      height: 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .left-arrow {
    }
    .right-arrow {
    }
    .dot-wrapper {
      max-width: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      padding: 4px 12px;
      border-radius: 8px;
      background-color: #3333331c;
      backdrop-filter: blur(5px);
      .dot {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        box-shadow: 1px 1px 5px #636363;
        flex-shrink: 0;
        margin: 4px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          filter: contrast(1.5);
          transform: scale(1.15) translateY(-4px);
          box-shadow: 1px 1px 10px #636363;
        }
      }

      .dot-selected {
        filter: contrast(1.5);
        transform: scale(1.05) translateY(-4px);
        box-shadow: 1px 1px 10px #636363;
      }
    }
  }
</style>
