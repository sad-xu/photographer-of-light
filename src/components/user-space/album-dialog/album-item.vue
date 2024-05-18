<template>
  <div class="album" @click="emits('select', album.id)">
    <div class="header">
      <span class="name">
        {{ album.name }}
      </span>
      <div class="header-right">
        <div class="icon-wrapper">
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M512 67C266.24 67 67 241.33 67 456.37c0 122.9 65.23 232.32 166.87 303.69V957l195-118.3a508.35 508.35 0 0 0 83.17 7c245.77 0 445-174.32 445-389.37S757.77 67 512 67zM289.5 512a55.62 55.62 0 1 1 55.62-55.62A55.62 55.62 0 0 1 289.5 512z m222.5 0a55.62 55.62 0 1 1 55.62-55.62A55.62 55.62 0 0 1 512 512z m222.5 0a55.62 55.62 0 1 1 55.62-55.62A55.62 55.62 0 0 1 734.5 512z"
              fill="#ddd"
            ></path>
          </svg>
          {{ album.commentNum }}
        </div>
        <div class="icon-wrapper">
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M512 901.746939c-13.583673 0-26.122449-4.179592-37.093878-13.061225-8.881633-7.314286-225.697959-175.020408-312.424489-311.379592C133.746939 532.37551 94.040816 471.24898 94.040816 384.522449c0-144.718367 108.146939-262.269388 240.326531-262.269388 67.395918 0 131.657143 30.82449 177.632653 84.636735 45.453061-54.334694 109.191837-84.636735 177.110204-84.636735 132.702041 0 240.326531 117.55102 240.326531 262.269388 0 85.159184-37.093878 143.673469-67.395919 191.216327l-1.044898 1.567346c-86.726531 136.359184-303.542857 304.587755-312.424489 311.379592-10.44898 8.359184-22.987755 13.061224-36.571429 13.061225z"
              fill="#E5404F"
            ></path>
          </svg>
          {{ album.star }}
        </div>
      </div>
    </div>
    <div class="desc">{{ album.desc }}</div>
    <div class="footer">
      <span>{{ album.userName }}</span>
      <thumbnails-group
        :photo-num="album.photoNum"
        :thumbnails="album.thumbnails"
      ></thumbnails-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // @ts-nocheck
  import { Album } from '@/api/types';
  import ThumbnailsGroup from '@/components/home/thumbnails-group.vue';

  const props = defineProps<{
    type?: string;
    album: Album;
  }>();

  const emits = defineEmits<{
    (e: 'select', id: string): void;
  }>();
</script>

<style lang="scss" scoped>
  .album {
    width: 600px;
    margin: 0 auto 20px;
    padding: 12px 12px 8px;
    border: 1px solid #555;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.5s ease;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .name {
        font-weight: bold;
        font-size: 16px;
      }

      .header-right {
        display: flex;
      }
    }

    .desc {
      margin-top: 4px;
      color: #bbb;
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 22px;
      margin-top: 4px;
      font-size: 13px;
    }

    &:hover {
      box-shadow: 0 0 10px #5b5b5b;
    }
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    min-width: 45px;
    margin-left: 12px;

    .icon {
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }
  }

  @include media-breakpoint-down(md) {
    .album {
      width: 80%;
    }
  }

  @include media-breakpoint-down(sm) {
    .album {
      width: 95%;
    }
  }
</style>
