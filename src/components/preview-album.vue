<template>
  <div class="wrapper">
    <!-- 虚化背景 -->
    <div class="bg" :style="{ 'background-image': `url('${bgUrl}')` }"></div>
    <!-- 相册头部 -->
    <div class="album-header">
      <span class="album-name">相册名</span>
      <div>descdescdesc</div>
    </div>
    <div class="album-body">
      <div class="comment-area"></div>
      <div class="preview-area">
        <div class="photo-header" :style="{ transform: `translate(${offset.x}px,${offset.y}px)` }">
          <span class="photo-title">照片标题标题</span>
          <!-- <a :href="photoList[currentIndex].url" target="_blank" class="photo-header-right">
            原图
          </a> -->
          <span>{{ photoList[currentIndex].name }}</span>
        </div>
        <div
          class="card-wrapper"
          :style="{ width: currentWidth == 0 ? 'initital' : `${currentWidth}px` }"
        >
          <custom-card
            :img-url="photoList[currentIndex].url"
            :style="{ transform: `translate(${offset.x / 2}px,${offset.y / 2}px)` }"
            @render-size="setAlbumWidth"
          ></custom-card>
        </div>
        <div
          class="ablum-footer"
          :style="{ transform: `translate(${-offset.x / 2}px,${offset.y}px)` }"
        >
          <div class="desc">descdesc</div>
          <div class="dot-wrapper">
            <div
              v-for="(_, index) in photoList"
              :key="index"
              class="dot"
              :class="index == currentIndex ? 'dot-selected' : ''"
              @click="() => togglePhotoIndex(index)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
  import CustomCard from './custom-card.vue';

  const timeId = ref(0);
  // 鼠标位移
  const offset = reactive({
    width: window.innerWidth,
    height: window.innerHeight,
    x: 0,
    y: 0,
  });

  // 当前照片index
  const currentIndex = ref(0);
  // 当前照片宽度
  const currentWidth = ref(0);
  const photoList = ref<{ name: string; url: string }[]>([]);
  const bgUrl = ref('');

  photoList.value = [
    'ffxiv_dx11 2023-06-24 22-28-46.png',
    'ffxiv_dx11 2023-10-02 21-22-49.png',
    'ffxiv_dx11 2023-10-02 21-24-18.png',
    'ffxiv_dx11 2023-10-02 21-27-03.png',
    'ffxiv_dx11 2023-10-02 21-52-22.png',
    'ffxiv_dx11 2023-10-02 21-59-18.png',
    'ffxiv_dx11 2023-10-02 22-17-01.png',
    'ffxiv_dx11 2023-10-02 22-18-46.png',
    'ffxiv_dx11 2023-10-02 22-25-13.png',
    'ffxiv_dx11 2023-10-02 22-27-11.png',
    'ffxiv_dx11 2023-10-02 22-30-52.png',
    'ffxiv_dx11 2023-10-02 22-44-22.png',
    'ffxiv_dx11 2023-10-02 22-49-45.png',
    'ffxiv_dx11 2023-10-02 22-55-42.png',
    'ffxiv_dx11 2023-10-02 23-03-26.png',
    'ffxiv_dx11 2023-10-02 23-06-56.png',
    'ffxiv_dx11 2023-10-02 23-09-25.png',
    'ffxiv_dx11 2023-10-02 23-13-21.png',
  ].map((p) => {
    const list = p.split('dx11');
    let name = list[list.length - 1];
    name = name.split('.png')[0].trim();
    const date = name.split(' ');
    if (date.length === 2) {
      date[1] = date[1].slice(0, 5).replace('-', ':');
      name = date.join(' ');
    }

    return {
      name: name,
      url: `https://fffff.games/yixisi/album/${p}`,
    };
  });
  bgUrl.value = photoList.value[0].url;

  onMounted(() => {
    window.addEventListener('mousemove', handleParallax);
    window.addEventListener('resize', handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleParallax);
    window.removeEventListener('resize', handleResize);
  });

  /** 更新窗口尺寸 */
  const handleResize = () => {
    offset.width = window.innerWidth;
    offset.height = window.innerHeight;
  };

  /** 根据鼠标位置计算位移 */
  const handleParallax = (e: MouseEvent) => {
    if (timeId.value != 0) return;
    timeId.value = window.requestAnimationFrame(() => {
      offset.x = ((e.clientX - offset.width / 2) / (offset.width / 2)) * 20;
      offset.y = ((e.clientY - offset.height / 2) / (offset.height / 2)) * 5;
      timeId.value = 0;
    });
  };

  /** 设置相册宽度为当前图片的渲染尺寸 */
  const setAlbumWidth = (width: number) => {
    currentWidth.value = width;
    bgUrl.value = photoList.value[currentIndex.value].url;
  };

  /** 切换图片 */
  const togglePhotoIndex = (index: number) => {
    if (index != currentIndex.value) {
      currentIndex.value = index;
    }
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

    .comment-area {
      position: absolute;
      top: 0;
      bottom: 120px;
      left: 0;
      width: 220px;
      background-color: #3a3a3a;
      opacity: 0.3;
    }

    .preview-area {
      z-index: 2;

      .photo-header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
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

      .card-wrapper {
        display: flex;
        flex-grow: 1;
        align-items: center;
        width: inherit;
        transition: all 0.3s;
      }

      .ablum-footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding-top: 8px;
        transition: transform 0.1s;

        .desc {
          width: 100%;
          font-size: 14px;
          font-family: fangsong, sans-serif;
          line-height: 1.2;
          word-break: break-all;
        }

        .dot-wrapper {
          display: flex;
          margin-top: 4px;

          .dot {
            width: 10px;
            height: 10px;
            margin-left: 12px;
            background-color: #f3f3f3;
            border-radius: 100%;
            cursor: pointer;
            transition: transform 0.3s;

            &:hover {
              transform: scale(1.3);
            }
          }

          .dot-selected {
            background-color: #009688;
          }
        }
      }
    }
  }
</style>
