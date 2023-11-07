<template>
  <div class="wrapper">
    <!-- 虚化背景 -->
    <div class="bg" :style="{ 'background-image': `url('${bgUrl}')` }"></div>
    <!-- 相册头部 -->
    <div class="album-header">
      <span class="album-name">{{ albumInfo.name }}</span>
      <div>{{ albumInfo.desc }}</div>
    </div>
    <div class="album-body">
      <!-- 评论区 -->
      <comment-part :comment-list="commentList"></comment-part>
      <div class="preview-area">
        <!-- header -->
        <div class="photo-header" :style="{ transform: `translate(${offset.x}px,${offset.y}px)` }">
          <span class="photo-title">{{ albumInfo.name }}</span>
          <!-- <a :href="photoList[currentIndex].url" target="_blank" class="photo-header-right">
            原图
          </a> -->
          <span>{{ photoList[currentIndex]?.name }}</span>
        </div>
        <!-- 照片展示区 -->
        <custom-card
          :img-url="photoList[currentIndex]?.url || ''"
          :offset="offset"
          @render-size="setAlbumBg"
        ></custom-card>
        <!-- footer -->
        <div
          class="ablum-footer"
          :style="{ transform: `translate(${-offset.x / 2}px,${offset.y}px)` }"
        >
          <album-pagination
            :photo-list="photoList"
            :default-index="currentIndex"
            @change="togglePhotoIndex"
          ></album-pagination>
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
  import { mockRequest } from '@/api/album';
  import { Album, Photo, Comment } from '@/api/types';
  import { mockAlbum } from '@/utils/mock';

  const props = defineProps<{
    albumId: string;
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
    tags: [],
  });
  const photoList = ref<Photo[]>([]);
  const commentList = ref<Comment[]>([]);

  // 当前照片index
  const currentIndex = ref(0);
  // 背景图
  const bgUrl = ref('');

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
          albumInfo.tags = res.tags;
          photoList.value = res.photos;
          commentList.value = res.comments;
          if (res.photos.length) {
            bgUrl.value = res.photos[0].url;
          }
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

    .preview-area {
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .photo-header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 55vw;
        max-width: 65vw;
        padding-top: 30px;
        padding-bottom: 8px;
        font-family: cursive;

        .photo-title {
          font-weight: bold;
          font-size: 24px;
        }

        .photo-header-right {
          color: #9e9e9e;
          font-size: 14px;
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
