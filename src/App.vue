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
    const list = window.location.search.slice(1).split('&');
    const searchMap: any = {};
    list.forEach((item) => {
      const [k, v] = item.split('=');
      searchMap[k] = v;
    });
    const id = +searchMap['id'];
    if (id) {
      return id;
    } else return 0;
  };

  const albumId = ref(getAlbumId());
</script>
