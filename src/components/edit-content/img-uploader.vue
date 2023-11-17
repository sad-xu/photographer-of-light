<template>
  <div class="img-uploader">
    <div class="container">
      <img
        class="img"
        :style="{
          transform: `rotate(${props.rotate}deg)`,
        }"
        v-if="props.fileUrl || props.url"
        :src="props.fileUrl || props.url"
        @click="openFile"
      />
      <svg
        v-else
        class="placeholder-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        @click="openFile"
      >
        <path
          d="M984.615385 196.923077c0-43.323077-35.446154-78.769231-78.769231-78.769231H118.153846c-43.323077 0-78.769231 35.446154-78.769231 78.769231v630.153846c0 43.323077 35.446154 78.769231 78.769231 78.769231h787.692308c43.323077 0 78.769231-35.446154 78.769231-78.769231V196.923077zM779.815385 748.307692h-571.076923c-23.630769 0-37.415385-25.6-25.6-45.292307l173.292307-301.292308c7.876923-13.784615 25.6-13.784615 33.476923 0l104.369231 179.2c7.876923 11.815385 25.6 13.784615 33.476923 1.969231l84.676923-122.092308c7.876923-11.815385 25.6-11.815385 33.476923 0L801.476923 708.923077c11.815385 17.723077 0 39.384615-21.661538 39.384615zM728.615385 393.846154c-43.323077 0-78.769231-35.446154-78.769231-78.769231s35.446154-78.769231 78.769231-78.769231 78.769231 35.446154 78.76923 78.769231-35.446154 78.769231-78.76923 78.769231z"
          fill="#fff"
        ></path>
      </svg>
      <!-- rotate -->
      <svg
        v-if="props.fileUrl || props.url"
        class="rotate-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
        @click="emits('rotate')"
      >
        <path
          d="M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32z m-44 402H188V494h440v326z"
        ></path>
        <path
          d="M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-0.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7 0.4 12.6-6.1v-63.9c12.9 0.1 25.9 0.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8 11 40.7 14 82.7 8.9 124.8-0.7 5.4-1.4 10.8-2.4 16.1h74.9c14.8-103.6-11.3-213-81-302.3z"
        ></path>
      </svg>
      <input
        ref="uploadInputRef"
        class="upload-input"
        type="file"
        accept="image/png,image/jpeg"
        @change="handleFileChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const props = defineProps<{
    // 图片文件
    fileUrl?: string;
    // 图片线上地址
    url?: string;
    // 旋转角度
    rotate: number;
  }>();

  const emits = defineEmits<{
    (e: 'upload', fileUrl: string, fileName: string): void;
    (e: 'rotate'): void;
  }>();

  const uploadInputRef = ref();

  const openFile = () => {
    uploadInputRef.value.click();
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file) {
        emits('upload', window.URL.createObjectURL(file), file.name);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .img-uploader {
    position: relative;
    width: 100%;
    padding-top: 100%;

    .container {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.15s;
      user-select: none;

      &:hover {
        background-color: #333;
      }
    }

    .img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.3s;
    }

    .placeholder-icon {
      width: 80px;
      height: 80px;
    }

    .rotate-icon {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 2;
      width: 20px;
      height: 20px;
      padding: 2px;
      background-color: #00000080;
      border-radius: 100%;
      transition: all 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }

    .upload-input {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 0;
      height: 0;
      visibility: hidden;
    }
  }
</style>
