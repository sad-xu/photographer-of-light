<template>
  <div class="album-dialog">
    <x-loading v-if="loading"></x-loading>
    <TransitionGroup name="album">
      <div
        v-for="(album, i) in albumList"
        :key="album.id"
        :style="{ 'transition-delay': `${i * 0.1}s` }"
      >
        <album-item :type="props.type" :album="album" @select="handleSelect"></album-item>
      </div>
    </TransitionGroup>
    <div style="height: 10vh"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import AlbumItem from './album-item.vue';
  import XLoading from '@/common/x-loading.vue';
  import { Album } from '@/api/types';
  import { mockRequest } from '@/api/album';
  import { mockPhotos } from '@/utils/mock';

  const props = defineProps<{ type: string }>();
  const emits = defineEmits<{
    (e: 'select', id: string): void;
  }>();

  const loading = ref(false);
  const albumList = ref<Album[]>([]);

  const initAlbum = () => {
    loading.value = true;
    mockRequest(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i + '',
        name: '相册-' + i,
        userId: i + '',
        userName: 'name' + i,
        desc: '全家福全家福全家福全家福全家福全家福全家福全家福全家福全家福全家福全家福',
        star: 12,
        photoNum: 15,
        commentNum: 21,
        createTime: 1699515280,
        updateTime: 1699515280,
        photos: [],
        comments: [],
        type: 1,
        thumbnails: [...mockPhotos.map((v) => v.thumbnail), ...mockPhotos.map((v) => v.thumbnail)],
      }))
    )
      .then((res) => {
        albumList.value = res as Album[];
      })
      .finally(() => {
        loading.value = false;
      });
  };

  initAlbum();

  const handleSelect = (id: string) => {
    emits('select', id);
  };
</script>

<style lang="scss" scoped>
  .album-dialog {
    padding-bottom: 30vh;
  }

  .album-enter-active,
  .album-leave-active {
    transition: all 0.8s ease;
  }

  .album-enter-from,
  .album-leave-to {
    transform: translateY(80px);
    opacity: 0;
  }
</style>
