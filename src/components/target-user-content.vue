<template>
  <div class="album-dialog">
    <div class="title">{{ store.targetUserName }}的相册</div>
    <x-loading v-if="loading"></x-loading>
    <TransitionGroup name="album">
      <div
        v-for="(album, i) in albumList"
        :key="album.id"
        :style="{ 'transition-delay': `${i * 0.1}s` }"
      >
        <album-item :album="album" @select="handleSelectAlbum"></album-item>
      </div>
    </TransitionGroup>
    <div style="height: 10vh"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import AlbumItem from './user-space/album-dialog/album-item.vue';
  import XLoading from '@/common/x-loading.vue';
  import { Album } from '@/api/types';
  import { mockRequest } from '@/api/album';
  import { mockPhotos } from '@/utils/mock';
  import useStore from '@/store/app';

  const store = useStore();
  const loading = ref(false);
  const albumList = ref<Album[]>([]);

  const initAlbum = () => {
    console.log(store.targetUserId, store.targetUserName);
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

  const handleSelectAlbum = (albumId: string) => {
    store.closeTargetUser();
    store.setDetailId(albumId);
  };
</script>

<style lang="scss" scoped>
  .album-enter-active,
  .album-leave-active {
    transition: all 0.8s ease;
  }

  .album-enter-from,
  .album-leave-to {
    transform: translateY(80px);
    opacity: 0;
  }

  .album-dialog {
    padding-bottom: 30vh;
  }

  .title {
    position: absolute;
    top: 10vh;
    left: 50%;
    color: #cde9ff;
    font-weight: bold;
    font-size: 32px;
    transform: translateX(-50%);
  }
</style>
