<template>
  <div>
    <preview-album v-if="albumId" :album-id="albumId" @back="() => {}"></preview-album>
    <manage v-else></manage>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import PreviewAlbum from './components/preview-album/index.vue';
  import Manage from './components/manage/index.vue';

  const getAlbumId = () => {
    const list = window.location.pathname.split('/p/');
    if (list.length > 1) {
      return list[1];
    } else return '';
  };

  const albumId = ref(getAlbumId());
</script>

<style lang="scss" scoped></style>
