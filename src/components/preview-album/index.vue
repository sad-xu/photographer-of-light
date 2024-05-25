<template>
  <div class="wrapper">
    <!-- 虚化背景 -->
    <div class="bg" :style="{ 'background-image': `url('${bgUrl}')` }"></div>
    <!-- 相册头部 -->
    <div class="album-header">
      <!-- <svg
        class="back-icon"
        viewBox="0 0 1088 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        @click="emits('back')"
      >
        <path
          d="M83.648 383.232l339.776-297.28c26.304-26.24 57.024-30.656 83.328-4.352v200.448l14.656-0.064c321.024 0 559.232 228.032 559.232 538.24 0 108.032-49.536 68.672-70.208 30.976-97.408-177.92-268.608-299.328-491.584-299.328l-12.16 0.064v196.16c-26.304 26.24-60.224 23.104-83.328 4.352L83.584 478.336a67.328 67.328 0 0 1 0.064-95.104z"
        ></path>
      </svg> -->
      <span class="album-name">{{ albumInfo.name }}</span>
      <div>{{ albumInfo.desc }}</div>
    </div>
    <div class="album-body">
      <Transition name="fade" appear>
        <x-loading class="loading" v-if="loading"></x-loading>
      </Transition>
      <div class="preview-area">
        <!-- header -->
        <div class="photo-header" :style="{ transform: `translate(${offset.x}px,${offset.y}px)` }">
          <span class="photo-title">{{ photoList[currentIndex]?.name }}</span>
        </div>
        <!-- 照片展示区 -->
        <custom-card
          ref="customCardRef"
          :img-url="photoList[currentIndex]?.url ?? ''"
          :img-width="photoList[currentIndex]?.width ?? 0"
          :img-height="photoList[currentIndex]?.height ?? 0"
          :offset="offset"
          :setting="setting"
          @loaded="setAlbumBg"
          @scale-change="handleScaleChange"
        ></custom-card>
        <!-- setting -->
        <setting-part
          v-if="!loading && !noData"
          :setting="setting"
          :img-url="photoList[currentIndex]?.url || ''"
          @setting-change="handleSettingChange"
        >
          <svg
            class="rotate-icon"
            @click="handleRotate"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M288 352v192h128v64h-128v64h192v-320h-192z m128 128h-64v-64h64v64zM544 352v320h192v-320h-192z m128 256h-64v-192h64v192zM957.44 531.84h1.344v-1.92l-1.344 1.92z"
            ></path>
            <path
              d="M994.56 474.88l-35.84 55.04-1.28 1.92-35.84 55.04-60.16-119.04 32 1.92C872.32 277.76 709.76 128 512 128 300.16 128 128 300.16 128 512s172.16 384 384 384c140.16 0 263.04-75.52 329.6-188.16h1.856l0.704 0.704 53.056 31.296A446.4 446.4 0 0 1 512 960c-247.68 0-448-200.32-448-448s200.32-448 448-448c234.88 0 426.88 179.84 446.08 408.96l36.48 1.92z"
            ></path>
          </svg>
        </setting-part>
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
    <!--  -->
    <no-data v-if="!loading && noData"></no-data>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
  import CustomCard from './custom-card.vue';
  import AlbumPagination from './album-pagination.vue';
  import NoData from './no-data.vue';
  import XLoading from '@/common/x-loading.vue';
  import SettingPart from './setting-part.vue';
  import { fetchAlbumDetail } from '@/api/album';
  import { Album, Photo } from '@/api/types';
  import { CARD_SETTING_KEY, isIOS, isTouchDevice } from '@/utils';

  export interface CardSetting {
    scale: number;
    shine: string;
    glare: string;
  }

  const props = defineProps<{
    albumId: number;
  }>();

  const emits = defineEmits<{
    (e: 'back'): void;
  }>();

  const loading = ref(true);
  const noData = ref(false);

  const customCardRef = ref();

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
    desc: '',
    createTime: 0,
    updateTime: 0,
  });
  const photoList = ref<Photo[]>([]);

  // 当前照片index
  const currentIndex = ref(0);
  // 背景图
  const bgUrl = ref('');

  // 卡片配置
  let defaultSetting: CardSetting = {
    scale: 1, // 缩放
    shine: 's-1', // 炫光
    glare: 'g-1', // 光晕
  };
  try {
    const localSetting = window.localStorage.getItem(CARD_SETTING_KEY);
    if (localSetting) {
      defaultSetting = {
        ...defaultSetting,
        ...JSON.parse(localSetting),
      };
    }
  } catch (e) {
    console.log(e);
  }
  const setting = reactive<CardSetting>(defaultSetting);

  let timeId = 0;

  onMounted(() => {
    if (isTouchDevice) {
      if (isIOS && (DeviceOrientationEvent as any).requestPermission) {
        (DeviceOrientationEvent as any).requestPermission().then((res: any) => {
          if (res !== 'denied') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        });
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    } else {
      window.addEventListener('mousemove', handleMousemove);
      window.addEventListener('resize', handleResize);
    }
  });

  onBeforeUnmount(() => {
    if (isTouchDevice) {
      window.removeEventListener('deviceorientation', handleOrientation);
    } else {
      window.removeEventListener('mousemove', handleMousemove);
      window.removeEventListener('resize', handleResize);
    }
  });

  watch(
    () => props.albumId,
    (id) => {
      if (id) {
        // 获取相册信息+评论
        loading.value = true;
        fetchAlbumDetail(props.albumId)
          .then((res: any) => {
            if (res) {
              albumInfo.id = res.id;
              albumInfo.name = res.name;
              albumInfo.desc = res.desc;
              albumInfo.createTime = res.createTime;
              albumInfo.updateTime = res.updateTime;
              photoList.value = res.photos;
              noData.value = false;
            } else {
              noData.value = true;
            }
          })
          .finally(() => {
            loading.value = false;
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
  const handleMousemove = (e: MouseEvent) => {
    if (timeId != 0) return;
    timeId = window.requestAnimationFrame(() => {
      offset.x = ((e.clientX - windowSize.width / 2) / (windowSize.width / 2)) * 20;
      offset.y = ((e.clientY - windowSize.height / 2) / (windowSize.height / 2)) * 5;
      timeId = 0;
    });
  };

  /** 陀螺仪 */
  const handleOrientation = (e: DeviceOrientationEvent) => {
    // 左右旋转 gamma [-90,90) 前后旋转 beta [-180,180)
    if (timeId != 0) return;
    timeId = window.requestAnimationFrame(() => {
      offset.x = ((e.gamma ?? 0) / 90) * 40;
      offset.y = (((e.beta ?? 90) - 90) / 180) * 20;
      timeId = 0;
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

  /** 更新setting */
  const handleSettingChange = (settingName: string, val: number | string) => {
    if (settingName === 'scale') {
      handleScaleChange(val as number);
    } else if (settingName === 'shine') {
      setting.shine = val as string;
    } else if (settingName === 'glare') {
      setting.glare = val as string;
    }
    window.localStorage.setItem(CARD_SETTING_KEY, JSON.stringify(setting));
  };

  /** 旋转 */
  const handleRotate = () => {
    customCardRef.value.rotateCard();
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
      align-items: center;
      justify-content: space-between;

      .photo-header {
        min-width: 55vw;
        max-width: 65vw;
        padding-top: 30px;
        padding-bottom: 8px;
        font-family: cursive;
        text-align: center;
        transition: transform 0.1s;

        .photo-title {
          font-weight: bold;
          font-size: 24px;
        }
      }

      .rotate-icon {
        width: 22px;
        height: 22px;
        cursor: pointer;
        transition: all 0.3s;
        fill: rgb(255 255 255 / 50%);

        &:hover {
          fill: #fff;
        }
      }

      .ablum-footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding-bottom: 10vh;
        transition: transform 0.1s;
      }
    }
  }
</style>
