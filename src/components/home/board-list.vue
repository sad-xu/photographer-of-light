<template>
  <h3>{{ props.name }}</h3>
  <div class="board-list">
    <div class="scroll-container">
      <div v-for="album in props.albumList" :key="album.id" class="album">
        <div class="album-header">
          <div>{{ album.name }}</div>
          <div v-if="props.type === 'likest'">
            {{ album.star }}
          </div>
          <div v-if="props.type === 'commentest'">
            {{ album.commentNum }}
          </div>
        </div>
        <div v-if="props.type === 'latest'">
          {{ album.updateTime }}
        </div>
        <div v-if="props.type === 'random'">
          {{ album.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Album } from '@/api/types';

  const props = defineProps<{
    name: string;
    albumList: Album[];
    type: string;
  }>();

  // const containerRef = ref();
  // const showTopShadow = ref(false);
  // const showBottomShadow = ref(false);

  // const handleScroll = (e: any) => {
  //   console.log(e);
  //   const target = e.target;
  //   const scrollTop = target.scrollTop;
  //   showTopShadow.value = scrollTop > 0;
  //   showBottomShadow.value = target.clientHeight + scrollTop + 4 < target.scrollHeight;
  // };
</script>

<style lang="scss" scoped>
  h3 {
    flex-shrink: 0;
    height: 32px;
  }

  .board-list {
    position: relative;
    flex: 1;
    height: calc(100% - 32px);

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      background: linear-gradient(#f00, transparent);
      opacity: 0;
      transition: opacity 0.15s;
      content: '';
    }

    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 60px;
      background: linear-gradient(transparent, #2f2f2f);
      opacity: 0;
      transition: opacity 0.15s;
      content: '';
    }

    .scroll-container {
      height: 100%;
      overflow-y: auto;

      .album {
        height: 80px;

        .album-header {
          display: flex;
          justify-content: space-between;
          padding-right: 8px;
        }
      }
    }
  }

  // .top-shadow::before {
  //   opacity: 1;
  // }

  // .bottom-shadow::after {
  //   opacity: 1;
  // }
</style>
