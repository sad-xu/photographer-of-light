<template>
  <div class="album-pagination">
    <div class="left-arrow arrow" @click="() => togglePhoto(-1)">👈</div>
    <div class="dot-wrapper">
      <div
        v-for="(_, index) in photoList"
        :key="index"
        class="dot"
        :style="{ background: `url(${defaultBase64Data})` }"
        :class="index === props.defaultIndex ? 'dot-selected' : ''"
        @click="() => emit('change', index)"
      ></div>
    </div>
    <div class="right-arrow arrow" @click="() => togglePhoto(1)">👉</div>
  </div>
</template>

<script lang="ts" setup>
  import { Photo } from '@/api/types';
  const defaultBase64Data = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAUGBwEI/8QAKRAAAgEDAwQBAwUAAAAAAAAAAQIDBAURAAYhBxITMUEIFBUyQlFhcf/EABcBAQEBAQAAAAAAAAAAAAAAAAIFAwT/xAAhEQACAgECBwAAAAAAAAAAAAAAAQIRAxIxExQhM1GB8P/aAAwDAQACEQMRAD8AsW2+rVxs60tso6mKfxkuKeRCzFFBZlDZHsBuOf61aOoPUa+Q0cr0s8duo4ESQzRsfJUGQsURSncFIQdxBI5z7yuefT7s2go+oeNx1kNrr6iGWmpLLcIfHNWntzI8YmJZ1ETkEp+1znAUgz3V/pRFt+x/hBHdrxBRU33FHXzkmPs70iELSE8yBQvs8gFsZyNXoztNs45LRHRbt0eY77u6tvFxepq3kqZmGC8zMzY+Bk6ajqvbUk9TJ5mrqGRTgwpSLUAD2CHVxnIIPIB5/wA01lx4eActkZudOiyVu27mo8NV5grmM8OQ3YWwf0OVUDuTtI+CMDGudQd9XO5zQ2ycwmjkgDOioQSSeDnOQRjjGPnORxppoPsx9lbLFXF191MluMMcdW6lBJj0WJyM844x/Ommmpz3Gtj/2Q==`;

  const props = defineProps<{
    // 图片列表
    photoList: any[]; // Photo[];
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
    margin-top: 20px;
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
