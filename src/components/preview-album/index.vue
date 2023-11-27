<template>
  <div class="wrapper">
    <!-- 虚化背景 -->
    <div class="bg" :style="{ 'background-image': `url('${bgUrl}')` }"></div>
    <!-- 相册头部 -->
    <div class="album-header">
      <svg
        class="back-icon"
        viewBox="0 0 1088 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        @click="emits('back')"
      >
        <path
          d="M83.648 383.232l339.776-297.28c26.304-26.24 57.024-30.656 83.328-4.352v200.448l14.656-0.064c321.024 0 559.232 228.032 559.232 538.24 0 108.032-49.536 68.672-70.208 30.976-97.408-177.92-268.608-299.328-491.584-299.328l-12.16 0.064v196.16c-26.304 26.24-60.224 23.104-83.328 4.352L83.584 478.336a67.328 67.328 0 0 1 0.064-95.104z"
        ></path>
      </svg>
      <span class="album-name">{{ albumInfo.name }}</span>
      <div>{{ albumInfo.desc }}</div>
    </div>
    <div class="album-body">
      <Transition name="fade" appear>
        <x-loading class="loading" v-if="!bgUrl"></x-loading>
      </Transition>
      <!-- 评论区 -->
      <comment-part :comment-list="commentList"></comment-part>
      <div class="preview-area">
        <!-- header -->
        <div class="photo-header" :style="{ transform: `translate(${offset.x}px,${offset.y}px)` }">
          <span class="photo-title">{{ photoList[currentIndex]?.name }}</span>
        </div>
        <!-- 照片展示区 -->
        <custom-card
          :img-url="photoList[currentIndex]?.url || ''"
          :offset="offset"
          :setting="setting"
          @render-size="setAlbumBg"
          @scale-change="handleScaleChange"
        ></custom-card>
        <!-- setting -->
        <setting-part
          :albumId="albumInfo.id ?? ''"
          :setting="setting"
          :img-url="photoList[currentIndex]?.url || ''"
          @scale-change="handleScaleChange"
          @on-edit="handleOpenEdit"
          @toggle-like="handleToggleLike"
        ></setting-part>
        <!-- footer -->
        <div
          class="ablum-footer"
          :style="{ transform: `translate(${-offset.x / 2}px,${offset.y}px)` }"
        >
          <Transition name="fade" appear>
            <album-pagination
              v-show="photoList.length"
              :photo-list="photoList"
              :default-index="currentIndex"
              @change="togglePhotoIndex"
            ></album-pagination>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
  import CustomCard from './custom-card.vue';
  import CommentPart from './comment-part.vue';
  import AlbumPagination from './album-pagination.vue';
  import XLoading from '@/common/x-loading.vue';
  import SettingPart from './setting-part.vue';
  import { mockRequest } from '@/api/album';
  import { Album, Photo, Comment, AlbumType } from '@/api/types';
  import { mockAlbum } from '@/utils/mock';
  import useStore from '@/store/app';

  const store = useStore();
  const props = defineProps<{
    albumId: string;
  }>();

  const emits = defineEmits<{
    (e: 'back'): void;
  }>();

  const timeId = ref(0);
  // 窗口尺寸
  const windowSize = reactive({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  // 鼠标位移
  const offset = reactive({
    x: 0,
    y: 0,
  });

  // 当前相册信息
  const albumInfo = reactive<Partial<Album>>({
    id: '',
    name: '',
    userId: '',
    userName: '',
    desc: '',
    star: 0,
    createTime: 0,
    updateTime: 0,
    type: AlbumType.portrait,
  });
  const photoList = ref<Photo[]>([]);
  const commentList = ref<Comment[]>([]);

  // 当前照片index
  const currentIndex = ref(0);
  // 背景图
  const bgUrl = ref('');

  // 卡片配置
  const setting = reactive({
    scale: 1, // 缩放
    like: false, // 是否喜欢
  });

  onMounted(() => {
    window.addEventListener('mousemove', handleParallax);
    window.addEventListener('resize', handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleParallax);
    window.removeEventListener('resize', handleResize);
  });

  watch(
    () => props.albumId,
    (id) => {
      if (id) {
        // 初始化是否喜欢
        setting.like = store.collection.some((v) => v == id);
        // 获取相册信息+评论
        mockRequest(mockAlbum).then((res: any) => {
          albumInfo.id = res.id;
          albumInfo.name = res.name;
          albumInfo.userId = res.userId;
          albumInfo.userName = res.userName;
          albumInfo.desc = res.desc;
          albumInfo.star = res.star;
          albumInfo.createTime = res.createTime;
          albumInfo.updateTime = res.updateTime;
          albumInfo.type = res.type;
          photoList.value = res.photos;
          commentList.value = res.comments;
          // if (res.photos.length) {
          //   bgUrl.value = res.photos[0].url;
          // }
        });
      }
    },
    { immediate: true }
  );

  /** 更新窗口尺寸 */
  const handleResize = () => {
    windowSize.width = window.innerWidth;
    windowSize.height = window.innerHeight;
  };

  /** 根据鼠标位置计算位移 */
  const handleParallax = (e: MouseEvent) => {
    if (timeId.value != 0) return;
    timeId.value = window.requestAnimationFrame(() => {
      offset.x = ((e.clientX - windowSize.width / 2) / (windowSize.width / 2)) * 20;
      offset.y = ((e.clientY - windowSize.height / 2) / (windowSize.height / 2)) * 5;
      timeId.value = 0;
    });
  };

  /** 设置背景图 */
  const setAlbumBg = () => {
    bgUrl.value = photoList.value[currentIndex.value]?.url;
  };

  /** 切换图片 */
  const togglePhotoIndex = (index: number) => {
    if (index != currentIndex.value) {
      currentIndex.value = index;
    }
  };

  /** 预加载图片 */
  const preloadImg = (url: string) => {
    let img: HTMLImageElement | null = new Image();
    img.src = url;
    img.onload = () => {
      img = null;
    };
  };

  /** 手动调整缩放 */
  const handleScaleChange = (v: number) => {
    const s = Math.min(Math.max(setting.scale + v, 0.2), 2);
    setting.scale = +`${Math.round(s * 10) / 10}`.slice(0, 3);
  };

  /** 打开编辑 */
  const handleOpenEdit = () => {
    store.openEdit();
  };

  /** 切换喜欢 */
  const handleToggleLike = () => {
    const flag = setting.like;
    if (flag) {
      store.removeCollection(props.albumId);
    } else {
      store.addCollection(props.albumId);
    }
    setting.like = !flag;
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;

    .bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: center / cover no-repeat;
      filter: blur(10px) brightness(0.8) grayscale(0.4);
      transition: all 0.3s;
    }
  }

  .album-header {
    z-index: 1;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: 100%;
    height: 44px;
    padding: 0 50px 0 8px;

    .back-icon {
      width: 24px;
      height: 24px;
      margin-right: 12px;
      cursor: pointer;
      transition: all 0.3s;
      fill: #fff;

      &:hover {
        fill: #2196f3;
      }
    }

    .album-name {
      margin-right: 12px;
      font-weight: bold;
      font-size: 20px;
    }
  }

  .album-body {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;

    .loading {
      position: absolute;
      top: 20vh;
    }

    .preview-area {
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .photo-header {
        min-width: 55vw;
        max-width: 65vw;
        padding-top: 30px;
        padding-bottom: 8px;
        font-family: cursive;
        text-align: center;

        .photo-title {
          font-weight: bold;
          font-size: 24px;
        }
      }

      .ablum-footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding-bottom: 5vh;
        transition: transform 0.1s;
      }
    }
  }
</style>
