<template>
  <div v-show="!loading">
    <div class="edit-header">
      <input
        class="name"
        v-model.trim="albumInfo.name"
        type="text"
        placeholder="相册名..."
        maxlength="50"
        @keyup.enter="(e: any) => e.target.blur()"
      />
    </div>
    <input
      class="desc"
      v-model.trim="albumInfo.desc"
      type="text"
      placeholder="相册简介..."
      maxlength="100"
      @keyup.enter="(e: any) => e.target.blur()"
    />
    <div class="scroll-wrapper">
      <div
        class="photo-wrapper"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @dragover.prevent=""
        @drop="handleDrop"
      >
        <TransitionGroup name="list">
          <div
            class="photo"
            :style="{ 'pointer-events': isDrag ? 'none' : 'initial' }"
            v-for="(photo, i) in albumInfo.photos"
            :key="photo.transId"
          >
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
              @upload="(file) => handleUpload(file, photo)"
            ></img-uploader>
            <!-- :rotate="photo.rotate" -->
            <!-- @rotate="() => handleRotate(photo)" -->
            <input
              class="photo-name"
              v-model.trim="photo.name"
              type="text"
              maxlength="20"
              placeholder="照片名..."
            />
            <svg
              v-if="checkExchangeVisible(i, Direction.right)"
              class="exchange-icon right-exchange"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              @click="exchangePhoto(i, Direction.right)"
            >
              <path
                d="M327.567 451.597V343.272h397.854c42.136 0 78.704 23.823 96.986 58.732 13.734-19.462 21.807-43.206 21.807-68.838 0-66.012-53.512-119.526-119.526-119.526h-397.12V104.886c0-16.012-18.056-25.367-31.136-16.133L50.85 262.108c-11.146 7.868-11.146 24.398 0 32.266L296.432 467.73c13.081 9.233 31.135-0.123 31.135-16.133zM972.16 729.645L726.577 556.29c-13.08-9.235-31.135 0.12-31.135 16.132V680.75H297.59c-42.138 0-78.706-23.823-96.987-58.732-13.735 19.462-21.807 43.206-21.807 68.836 0 66.014 53.513 119.527 119.525 119.527h397.121v108.754c0 16.011 18.056 25.366 31.135 16.132L972.16 761.912c11.145-7.87 11.145-24.4 0-32.267z"
              ></path>
            </svg>
            <svg
              v-if="checkExchangeVisible(i, Direction.bottom)"
              class="exchange-icon bottom-exchange"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              @click="exchangePhoto(i, Direction.bottom)"
            >
              <path
                d="M327.567 451.597V343.272h397.854c42.136 0 78.704 23.823 96.986 58.732 13.734-19.462 21.807-43.206 21.807-68.838 0-66.012-53.512-119.526-119.526-119.526h-397.12V104.886c0-16.012-18.056-25.367-31.136-16.133L50.85 262.108c-11.146 7.868-11.146 24.398 0 32.266L296.432 467.73c13.081 9.233 31.135-0.123 31.135-16.133zM972.16 729.645L726.577 556.29c-13.08-9.235-31.135 0.12-31.135 16.132V680.75H297.59c-42.138 0-78.706-23.823-96.987-58.732-13.735 19.462-21.807 43.206-21.807 68.836 0 66.014 53.513 119.527 119.525 119.527h397.121v108.754c0 16.011 18.056 25.366 31.135 16.132L972.16 761.912c11.145-7.87 11.145-24.4 0-32.267z"
              ></path>
            </svg>
          </div>
          <div
            key="add"
            :style="{ 'pointer-events': isDrag ? 'none' : 'initial' }"
            class="photo-add photo"
            @click="addPhoto"
          >
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
        <div class="tip">* 支持拖拽批量上传</div>
        <div v-if="isDrag" class="drag-mask"></div>
      </div>
    </div>
    <div class="footer">
      <button v-if="isEdit" @click="handleDelete">{{ albumInfo.deleted ? '还原' : '删除' }}</button>
      <button @click="handleSubmit">{{ isEdit ? '保存' : '新建' }}</button>
    </div>
  </div>
  <x-loading v-if="loading"></x-loading>
</template>

<script lang="ts" setup>
  import { Photo } from '@/api/types';
  import { reactive, ref, watch } from 'vue';
  import ImgUploader from './img-uploader.vue';
  import XMessage from '@/common/message.ts';
  import XLoading from '@/common/x-loading.vue';
  import {
    createAlbum,
    editAlbum,
    mockRequest,
    unDelteAlbum,
    uploadImg,
    fetchAdminAlbumDetail,
  } from '@/api/album';
  import { mockAlbum } from '@/utils/mock';

  interface EditPhoto extends Photo {
    transId: number; // 动画用唯一id
    fileUrl: string; // 上传的图片
    rotate: number; // 旋转角度
  }

  enum Direction {
    right = 1,
    bottom = 2,
  }

  const props = defineProps<{
    albumId: string | number;
  }>();

  const isEdit = ref(!!props.albumId);
  const loading = ref(false);
  const albumInfo = reactive<{
    _id?: string;
    id?: number;
    name: string;
    desc: string;
    photos: EditPhoto[];
    deleted: boolean;
  }>({
    id: 0,
    name: '',
    desc: '',
    photos: [],
    deleted: false,
  });

  const isDrag = ref(false);

  watch(
    () => props.albumId,
    (id) => {
      if (id === '-1') {
        // 新建
        isEdit.value = false;
        albumInfo.name = '';
        albumInfo.desc = '';
        albumInfo.photos = [];
      } else {
        // 编辑
        isEdit.value = true;
        loading.value = true;
        fetchAdminAlbumDetail(+id)
          // mockRequest(mockAlbum)
          .then((res: any) => {
            albumInfo._id = res._id;
            albumInfo.id = res.id;
            albumInfo.name = res.name;
            albumInfo.desc = res.desc;
            albumInfo.deleted = res.deleted;
            albumInfo.photos = res.photos.map((v: any) => ({
              ...v,
              transId: Math.random(),
              rotate: 0,
              fileUrl: '',
            }));
          })
          .finally(() => {
            loading.value = false;
          });
      }
    }
  );

  const generateNewPhoto = () => {
    return {
      transId: Math.random(),
      _id: '',
      name: '',
      url: '',
      fileUrl: '',
      width: 0,
      height: 0,
      rotate: 0,
      thumbnail: '',
    };
  };

  // 新增照片
  const addPhoto = () => {
    albumInfo.photos.push(generateNewPhoto());
  };

  // 移除照片
  const removePhoto = (i: number) => {
    albumInfo.photos.splice(i, 1);
  };

  // 上传单张图片
  const handleUpload = (file: File, photo: EditPhoto) => {
    const fileUrl = window.URL.createObjectURL(file);
    const fileName = file.name;
    if (photo.fileUrl) {
      window.URL.revokeObjectURL(photo.fileUrl);
    }
    const dotIndex = fileName.lastIndexOf('.');
    photo.name = dotIndex != -1 ? fileName.slice(0, dotIndex) : fileName;
    photo.fileUrl = fileUrl;
    uploadImg(file).then((res) => {
      photo.url = res;
    });
  };

  // 逆时针旋转
  const handleRotate = (photo: EditPhoto) => {
    photo.rotate = photo.rotate - 90;
  };

  // 获取缩略图和尺寸 加入旋转
  const initImgThumbnailData = (url: string, photo: EditPhoto) => {
    return new Promise((resolve) => {
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
        resolve(true);
      };
      img.src = url;
    });
  };

  // 移入
  const handleDragEnter = (e: DragEvent) => {
    isDrag.value = true;
  };

  // 移出
  const handleDragLeave = (e: DragEvent) => {
    isDrag.value = false;
  };

  // 拖入
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
          const newPhoto = generateNewPhoto();
          handleUpload(file, newPhoto);
          albumInfo.photos.push(newPhoto);
        }
      }
    }
    isDrag.value = false;
  };

  // 判断交换图标是否显示
  const checkExchangeVisible = (i: number, direction: Direction) => {
    const len = albumInfo.photos.length;
    const index = i + 1;
    if (direction === Direction.right) {
      if (index % 3 === 0 || index >= len) return false;
      return true;
    } else if (direction === Direction.bottom) {
      if (Math.ceil(index / 3) === Math.ceil(len / 3) || index + 3 > len) return false;
      return true;
    }
  };

  // 交换
  const exchangePhoto = (i: number, direction: Direction) => {
    let nextIndex = i;
    if (direction === Direction.right) {
      nextIndex = i + 1;
    } else if (direction === Direction.bottom) {
      nextIndex = i + 3;
    }
    const next = albumInfo.photos[nextIndex];
    albumInfo.photos[nextIndex] = albumInfo.photos[i];
    albumInfo.photos[i] = next;
  };

  const handleDelete = () => {
    if (albumInfo.deleted) {
      // 还原
      if (window.confirm('是否还原相册?')) {
        // unDelteAlbum(albumInfo.id!)
        mockRequest(true).then((res) => {
          XMessage.warning('还原成功~');
        });
      }
    } else {
      // 删除
      if (window.confirm('是否删除相册?')) {
        // delteAlbum(albumInfo.id!)
        mockRequest(true).then((res) => {
          XMessage.success('删除成功~');
        });
      }
    }
  };

  // 提交
  const handleSubmit = async () => {
    const { name, desc, photos } = albumInfo;
    if (!name.length) return XMessage.warning('请输入相册名~');
    if (!desc.length) return XMessage.warning('请输入相册简介~');
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      if (photo.fileUrl) {
        await initImgThumbnailData(photo.fileUrl, photo);
      }
    }
    console.log(JSON.stringify(albumInfo));
    loading.value = true;
    let p;
    if (isEdit.value) {
      p = editAlbum({ ...albumInfo });
    } else {
      p = createAlbum({ ...albumInfo });
    }
    p.then((res) => {
      XMessage.success('操作成功~');
    }).finally(() => {
      loading.value = false;
    });
  };
</script>

<style lang="scss" scoped>
  .edit-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .name {
      width: 50%;
      font-weight: bold;
      font-size: 24px;

      &::placeholder {
        font-size: 22px;
      }
    }
  }

  .desc {
    width: 100%;
    margin-bottom: 20px;
    padding: 4px 12px;
  }

  .scroll-wrapper {
    position: relative;
  }

  .photo-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    height: 65vh;
    margin-bottom: 32px;
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
      width: calc(33.3% - 12px);
      height: fit-content;
      margin: 0 6px 12px;
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

      .exchange-icon {
        position: absolute;
        z-index: 2;
        width: 18px;
        height: 18px;
        cursor: pointer;
        transition: all 0.15s;
        fill: #fff;

        &:hover {
          fill: #2196f3;
        }
      }

      .right-exchange {
        top: 50%;
        right: -7px;
        transform: translate(50%, -50%);
      }

      .bottom-exchange {
        bottom: -7px;
        left: 50%;
        transform: translate(-50%, 50%) rotate(90deg);
      }

      &:hover {
        .delete-icon {
          opacity: 1;
        }

        .exchange-icon {
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

    .tip {
      position: absolute;
      right: 4px;
      bottom: -18px;
      color: #999;
      font-size: 12px;
    }

    .drag-mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 100%;
      background-color: #ffffff4d;
      border: 3px dashed #2196f3;
      pointer-events: none;
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

  @include media-breakpoint-down(md) {
    .edit-dialog {
      width: 95vw;
      min-width: auto;
      max-width: 600px;
    }

    .photo-wrapper .photo {
      padding: 4px;

      .photo-name {
        font-size: 14px;
      }
    }
  }
</style>
