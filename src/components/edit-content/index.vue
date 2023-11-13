<template>
  <div class="edit-dialog">
    <input class="name" v-model="albumInfo.name" placeholder="相册名..." />
    <input class="desc" v-model="albumInfo.desc" placeholder="相册简介..." />
    <div class="photo-wrapper">
      <TransitionGroup name="list">
        <div class="photo" v-for="(photo, i) in albumInfo.photos" :key="photo.transId">
          <svg
            class="delete-icon"
            @click="removePhoto(i)"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM672 627.2c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L512 556.8l-115.2 115.2c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L467.2 512 352 396.8C339.2 384 339.2 364.8 352 352s32-12.8 44.8 0L512 467.2l115.2-115.2c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L556.8 512 672 627.2z"
              fill="#fff"
            ></path>
          </svg>
          <img-uploader
            :fileUrl="photo.fileUrl"
            :url="photo.url"
            :rotate="photo.rotate"
            @upload="(file, name) => handleUpload(file, name, photo)"
            @rotate="() => handleRotate(photo)"
          ></img-uploader>
          <input class="photo-name" v-model="photo.name" maxlength="20" placeholder="照片名..." />
        </div>
        <div key="add" class="photo-add photo" @click="addPhoto">
          <div class="add-container">
            <svg
              class="add-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M788.281302 548.493644h-540.994717c-16.799836 0-30.399703-13.599867-30.399703-30.399704 0-16.799836 13.599867-30.399703 30.399703-30.399703h540.994717c16.799836 0 30.399703 13.599867 30.399703 30.399703 0 16.699837-13.599867 30.399703-30.399703 30.399704zM517.683944 819.191c-16.799836 0-30.399703-13.599867-30.399703-30.399703v-541.494712c0-16.799836 13.599867-30.399703 30.399703-30.399703s30.399703 13.599867 30.399704 30.399703v541.494712c0.099999 16.799836-13.599867 30.399703-30.399704 30.399703zM512.483995 1023.989c-69.099325 0-136.19867-13.499868-199.298053-40.299606-60.999404-25.799748-115.798869-62.699388-162.698412-109.798928-47.09954-46.999541-83.99918-101.699007-109.798927-162.79841-26.699739-63.199383-40.199607-130.198729-40.199608-199.298054s13.599867-136.19867 40.199608-199.298054c25.799748-60.699407 62.699388-115.598871 109.798927-162.598412s101.699007-83.99918 162.698412-109.59893c63.099384-26.699739 130.198729-40.299606 199.298053-40.299606s136.19867 13.499868 199.298054 40.299606c60.999404 25.799748 115.798869 62.599389 162.698411 109.59893 47.09954 46.999541 83.99918 101.699007 109.798928 162.79841 26.699739 63.199383 40.199607 130.198729 40.199607 199.298054 0 92.699095-25.099755 183.498208-72.499292 262.697435-8.699915 14.499858-27.299733 19.099813-41.699592 10.499897-14.399859-8.699915-18.999814-27.299733-10.499898-41.799592 41.699593-69.699319 63.799377-149.698538 63.899376-231.297741 0-60.899405-11.899884-119.898829-35.399654-175.498286-22.699778-53.799475-55.29946-101.899005-96.699056-143.3986s-89.799123-73.999277-143.498599-96.699055c-55.599457-23.59977-114.69888-35.399654-175.698284-35.399655s-119.998828 11.899884-175.698284 35.399655c-53.599477 22.699778-101.799006 55.199461-143.198602 96.699055s-73.999277 89.599125-96.699055 143.3986c-23.499771 55.599457-35.399654 114.69888-35.399654 175.498286 0 60.899405 11.899884 119.898829 35.399654 175.498286 22.699778 53.799475 55.29946 101.899005 96.699055 143.3986 41.399596 41.399596 89.799123 73.999277 143.498599 96.699056 55.599457 23.59977 114.69888 35.399654 175.698284 35.399654 90.899112 0 178.498257-26.899737 253.397526-77.79924 13.899864-9.399908 32.79968-5.899942 42.299587 7.999921 9.399908 13.899864 5.899942 32.899679-7.999922 42.299587-85.199168 57.899435-184.698196 88.399137-287.897189 88.399137z"
              ></path>
            </svg>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div class="footer">
      <button @click="handleCancle">取消</button>
      <button @click="handleSubmit">确认</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Photo } from '@/api/types';
  import useStore from '@/store/app';
  import { reactive, ref } from 'vue';
  import ImgUploader from './img-uploader.vue';

  interface EditPhoto extends Photo {
    transId: number; // 动画用唯一id
    fileUrl: string; // 上传的图片
    rotate: number; // 旋转角度
  }

  const props = defineProps<{
    albumId?: string;
  }>();

  const store = useStore();

  const isEdit = ref(!!store.detailId);
  const loading = ref(false);
  const albumInfo = reactive<{
    name: string;
    desc: string;
    photos: EditPhoto[];
    tags: [];
  }>({
    name: '',
    desc: '',
    photos: [],
    tags: [],
  });

  if (store.detailId) {
    // 编辑
  }

  // 新增照片
  const addPhoto = () => {
    albumInfo.photos.push({
      transId: +new Date(),
      id: '',
      name: '',
      url: '',
      fileUrl: '',
      width: 0,
      height: 0,
      rotate: 0,
      thumbnail: '',
    });
  };

  // 移除照片
  const removePhoto = (i: number) => {
    albumInfo.photos.splice(i, 1);
  };

  // 上传单张图片
  const handleUpload = (fileUrl: string, fileName: string, photo: EditPhoto) => {
    if (photo.fileUrl) {
      window.URL.revokeObjectURL(photo.fileUrl);
    }
    const dotIndex = fileName.lastIndexOf('.');
    photo.name = dotIndex != -1 ? fileName.slice(0, dotIndex) : fileName;
    photo.fileUrl = fileUrl;
    photo.url = '';
  };

  // 逆时针旋转
  const handleRotate = (photo: EditPhoto) => {
    photo.rotate = photo.rotate - 90;
  };

  // 获取缩略图和尺寸 加入旋转
  const initImgThumbnailData = (url: string, photo: EditPhoto) => {
    const img = new Image();
    img.onload = (v) => {
      const size = 20;
      const imgWidth = img.width;
      const imgHeight = img.height;
      const square = Math.min(imgWidth, imgHeight);
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx?.translate(size / 2, size / 2);
      ctx?.rotate((photo.rotate * Math.PI) / 180);
      ctx?.drawImage(
        img,
        (imgWidth - square) / 2,
        (imgHeight - square) / 2,
        square,
        square,
        -size / 2,
        -size / 2,
        size,
        size
      );
      const isVertical = photo.rotate % 180 == 0;
      photo.thumbnail = canvas.toDataURL('image/jpeg', 0.9);
      photo.width = isVertical ? imgWidth : imgHeight;
      photo.height = isVertical ? imgHeight : imgWidth;
    };
    img.src = url;
  };

  // 提交
  const handleSubmit = () => {
    albumInfo.photos.forEach((photo) => {
      if (photo.fileUrl) {
        initImgThumbnailData(photo.fileUrl, photo);
      }
    });
    console.log(albumInfo);
  };

  // 取消
  const handleCancle = () => {
    store.closeEdit();
  };
</script>

<style lang="scss" scoped>
  .edit-dialog {
    width: 40vw;
    min-width: 600px;
  }

  input {
    display: block;
    padding: 8px 12px;
    color: #fff;
    font-size: 18px;
    background: #45454599;
    border: 1px solid #fff;
    border-radius: 4px;
    box-shadow: inset 0 0 4px #fff;
    transition: all 0.3s;

    &:focus {
      border-color: #2196f3;
      box-shadow: inset 0 0 4px #4da2c9;
    }

    &::placeholder {
      color: #999;
      font-size: 16px;
    }
  }

  .name {
    width: 50%;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 24px;

    &::placeholder {
      font-size: 22px;
    }
  }

  .desc {
    width: 100%;
    margin-bottom: 20px;
    padding: 4px 12px;
  }

  .photo-wrapper {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    height: 40vh;
    margin-bottom: 24px;
    padding: 12px 0.8% 0;
    overflow: hidden auto;
    border: 1px solid #fff;
    border-radius: 4px;

    .photo {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 31.2%;
      height: fit-content;
      margin: 0 1% 12px;
      margin-bottom: 12px;
      padding: 12px;
      border: 1px solid #fff;
      border-radius: 5px;

      .delete-icon {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.15s;
      }

      .photo-name {
        width: 100%;
        margin-top: 12px;
        padding: 4px 8px;
        font-size: 16px;

        &::placeholder {
          font-size: 14px;
        }
      }

      &:hover {
        .delete-icon {
          opacity: 1;
        }
      }
    }

    .photo-add {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .add-container {
        width: 100%;
        margin-bottom: 40px;
        padding-top: 100%;

        .add-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          transform: translate(-50%, -50%);
          transition: all 0.3s;
          fill: #ddd;
        }

        &:hover {
          .add-icon {
            fill: #fff;
          }
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-around;

    button {
      padding: 8px 22px;
      color: #eee;
      background-color: #494949;
      border: 1px solid #666;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        color: #fff;
        background-color: #737373;
        box-shadow: 0 0 4px #666;
      }
    }
  }

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    transform: scaleY(0.01) translateX(30px);
    opacity: 0;
  }

  .list-leave-active {
    position: absolute !important;
  }
</style>
