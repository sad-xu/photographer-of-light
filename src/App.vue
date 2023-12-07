<template>
  <div class="layout">
    <header>
      <div class="search-wrapper" @click="openSearchDialog">
        <svg
          class="search-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M970.961455 924.672 828.648727 782.359273C906.263273 699.182545 954.181818 587.938909 954.181818 465.454545 954.181818 208.779636 745.402182 0 488.727273 0 232.075636 0 23.272727 208.779636 23.272727 465.454545 23.272727 557.730909 50.338909 647.051636 101.585455 723.688727 112.290909 739.770182 133.957818 743.982545 149.992727 733.323636 166.027636 722.618182 170.333091 700.951273 159.627636 684.916364 116.107636 619.776 93.090909 543.906909 93.090909 465.454545 93.090909 247.296 270.568727 69.818182 488.727273 69.818182 706.885818 69.818182 884.363636 247.296 884.363636 465.454545 884.363636 683.613091 706.885818 861.090909 488.727273 861.090909 409.995636 861.090909 333.940364 837.957818 268.730182 794.228364 252.741818 783.546182 231.051636 787.758545 220.276364 803.770182 209.547636 819.781818 213.829818 841.472 229.818182 852.224 306.571636 903.703273 396.101818 930.909091 488.727273 930.909091 580.887273 930.909091 666.647273 903.633455 739.002182 857.250909L888.692364 1006.941091C900.049455 1018.298182 914.944 1024 929.815273 1024 944.709818 1024 959.604364 1018.298182 970.961455 1006.941091 993.698909 984.226909 993.698909 947.409455 970.961455 924.672ZM247.552 396.695273C273.501091 296.064 356.910545 222.685091 460.055273 209.768727 479.185455 207.371636 492.753455 189.917091 490.356364 170.786909 487.959273 151.656727 470.365091 138.065455 451.374545 140.485818 319.627636 156.986182 213.108364 250.728727 179.968 379.287273 175.150545 397.952 186.368 416.989091 205.056 421.783273 207.965091 422.551273 210.897455 422.900364 213.783273 422.900364 229.329455 422.900364 243.502545 412.450909 247.552 396.695273Z"
          ></path>
        </svg>
        <span>搜索</span>
      </div>
      <user-space></user-space>
    </header>
    <main>
      <Transition name="app-fade" mode="out-in" appear>
        <KeepAlive>
          <home-content v-if="!store.detailId"></home-content>
          <preview-album
            v-else="store.detailId"
            :album-id="store.detailId"
            @back="backToHome"
          ></preview-album>
        </KeepAlive>
      </Transition>
      <!-- 搜索 -->
      <x-dialog
        v-model:visible="searchVisible"
        :innerStyle="{ paddingTop: 0, alignItems: 'center' }"
        keepAlive
      >
        <search-content @close="closeSearchDialog"></search-content>
      </x-dialog>
      <!-- 新建|编辑 -->
      <x-dialog
        v-model:visible="store.editVisible"
        hideClose
        :innerStyle="{ paddingTop: 0, alignItems: 'center' }"
      >
        <edit-content></edit-content>
      </x-dialog>
      <!-- 更新日志|关于 -->
      <x-dialog v-model:visible="aboutVisible" center-close>
        <about-content :type="aboutType"></about-content>
      </x-dialog>
    </main>
    <footer>
      <div class="brand">
        <span @click="showMsg">光之摄影师 v0.1.0-dev</span>
        <!-- 更新日志 -->
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          @click="showAboutDialog('update')"
        >
          <path
            d="M380.535 418.401c0-27.124-21.962-49.116-49.086-49.116s-49.116 21.992-49.116 49.116 21.992 49.115 49.116 49.115 49.086-21.992 49.086-49.115z m311.016-49.116c-27.124 0-49.086 21.992-49.086 49.116s21.962 49.115 49.086 49.115 49.115-21.992 49.115-49.115c0-27.124-21.991-49.116-49.115-49.116zM511.5 53.167c-253.098 0-458.333 205.235-458.333 458.333S258.402 969.833 511.5 969.833 969.833 764.598 969.833 511.5 764.598 53.167 511.5 53.167z m269.062 727.395c-34.972 35.001-75.703 62.424-121.028 81.641-46.759 19.843-96.561 29.869-148.034 29.869-51.473 0-101.275-10.026-148.152-29.869-45.296-19.127-86.027-46.64-121.029-81.641-34.972-34.972-62.394-75.703-81.641-121.028-19.724-46.759-29.75-96.561-29.75-148.034s10.026-101.275 29.869-148.152c19.127-45.296 46.639-86.027 81.641-121.029 34.972-34.972 75.702-62.394 121.028-81.641 46.758-19.724 96.561-29.75 148.033-29.75 51.473 0 101.275 10.026 148.123 29.87 45.326 19.127 86.057 46.639 121.028 81.641 35.002 34.972 62.425 75.702 81.641 121.028 19.754 46.758 29.78 96.56 29.78 148.033s-10.026 101.275-29.869 148.123c-19.127 45.325-46.639 86.056-81.64 120.939z m-113.57-247.578h-49.205c-4.297 0-7.967 3.282-8.295 7.579-3.879 50.637-46.341 90.622-97.993 90.622-51.682 0-94.233-39.985-97.993-90.622-0.328-4.297-3.998-7.579-8.295-7.579h-49.206a8.183 8.183 0 0 0-8.206 8.594c4.506 86.235 76.21 155.104 163.699 155.104 87.459 0 159.193-68.869 163.699-155.104 0.181-4.715-3.49-8.594-8.205-8.594z"
          ></path>
        </svg>
        <!-- 使用说明 -->
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          @click="showAboutDialog('guide')"
        >
          <path
            d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333a467.370667 467.370667 0 0 1-103.850666 294.485333l-60.757334-60.8A382.336 382.336 0 0 0 896 512c0-212.074667-171.925333-384-384-384S128 299.925333 128 512s171.925333 384 384 384c93.376 0 178.986667-33.322667 245.546667-88.746667l60.565333 60.522667A467.498667 467.498667 0 0 1 512 981.333333C252.8 981.333333 42.666667 771.2 42.666667 512S252.8 42.666667 512 42.666667z m0 640a53.333333 53.333333 0 1 1 0 106.666666 53.333333 53.333333 0 0 1 0-106.666666z m0-448a170.666667 170.666667 0 0 1 170.666667 170.666666c0 48.896-28.693333 94.72-81.706667 138.709334a128 128 0 0 0-46.165333 92.8L554.666667 642.56h-85.333334V640l0.106667-4.224a213.333333 213.333333 0 0 1 71.872-153.002667l5.162667-4.416C581.845333 449.024 597.333333 424.277333 597.333333 405.333333a85.333333 85.333333 0 0 0-170.56-4.266666L426.666667 405.333333h-85.333334a170.666667 170.666667 0 0 1 170.666667-170.666666z"
          ></path>
        </svg>
        <!-- 关于 -->
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          @click="showAboutDialog('about')"
        >
          <path
            d="M859.85052445 819.40024889A462.46570667 462.46570667 0 0 0 976.21333333 512c0-256.39139555-207.82193778-464.21333333-464.21333333-464.21333333S47.78666667 255.60860445 47.78666667 512 255.60860445 976.21333333 512 976.21333333c33.24131555 0 166.71630222-1.45635555 400.86186667-4.44188444a27.30666667 27.30666667 0 0 0 18.05880888-47.44078222l-91.20426666-83.52199112c6.91768889-6.91768889 13.65333333-14.05383111 20.13411556-21.40842666zM512 921.6C285.79157333 921.6 102.4 738.20842667 102.4 512S285.79157333 102.4 512 102.4 921.6 285.79157333 921.6 512c0 101.32593778-36.88220445 196.86286222-102.67306667 271.24622222-11.65084445 13.18001778-24.17550222 25.59544889-37.42833778 37.20988445a27.30666667 27.30666667 0 0 0-0.43690666 40.70513778l62.11356444 56.87068444c-191.14666667 2.36657778-301.64764445 3.56807111-331.17525333 3.56807111z"
          ></path>
          <path
            d="M554.44790992 597.75021511c-3.72827022 17.28208592-28.3892243 140.89754548 53.16668683 70.44877274 0 0 40.11774103-27.14646755-17.94230045 35.22438637-58.06004148 62.44852622-132.27592059 82.17728948-140.89754548 35.22438637a1358.10010075 1358.10010075 0 0 1 35.22438636-211.89002429c1.82529897-16.03932918-17.94230045 0-17.94230043 0s-57.43866311 40.77795555-70.44877275 17.90346429c-1.82529897-3.72827022 17.94230045-17.9034643 17.94230045-17.90346429s119.84835318-88.39107318 158.83984592-70.44877275c38.83614815 17.825792-14.21403022 124.12032948-17.94230045 141.44125156z m60.8950803-223.19134341a61.74947555 61.74947555 0 1 1-103.49833481-67.57489778 61.74947555 61.74947555 0 1 1 103.49833481 67.57489778z"
          ></path>
        </svg>
      </div>
      <div>Made with <span class="heart">❤</span></div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import XDialog from './common/x-dialog.vue';
  import UserSpace from './components/user-space/index.vue';
  import PreviewAlbum from './components/preview-album/index.vue';
  import SearchContent from './components/search-content/index.vue';
  import EditContent from './components/edit-content/index.vue';
  import HomeContent from './components/home/index.vue';
  import AboutContent, { AboutType } from './components/about.vue';
  import XMessage from './common/message.ts';
  import useStore from '@/store/app';

  const store = useStore();
  const searchVisible = ref(false);
  const aboutVisible = ref(false);
  const aboutType = ref<AboutType>('about');

  /** 打开搜索 */
  const openSearchDialog = () => {
    searchVisible.value = true;
  };

  /** 选中相册+关闭搜索 */
  const closeSearchDialog = (id: string) => {
    store.setDetailId(id);
    searchVisible.value = false;
  };

  /** 回到首页 */
  const backToHome = () => {
    store.setDetailId('');
  };

  /** 关于 */
  const showAboutDialog = (type: AboutType) => {
    aboutType.value = type;
    aboutVisible.value = true;
  };

  const showMsg = () => {
    XMessage.success('message', 3000);
  };
</script>

<style lang="scss" scoped>
  // 切换显示|编辑
  .app-fade-enter-active,
  .app-fade-leave-active {
    transition: all 0.3s;
  }

  .app-fade-enter-from,
  .app-fade-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }

  .layout {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  header {
    position: fixed;
    top: 4px;
    right: 4px;
    z-index: 5;
    display: flex;
    align-items: center;

    .search-wrapper {
      display: flex;
      align-items: center;
      margin-right: 12px;
      padding: 4px 24px 4px 8px;
      color: #999;
      font-size: 14px;
      line-height: 18px;
      background-color: rgb(30 30 30 / 60%);
      border: 1px solid #666;
      border-radius: 20px;
      box-shadow: 0 1px 5px #333;
      cursor: pointer;
      transition: all 0.3s;

      .search-icon {
        width: 16px;
        height: 16px;
        margin-right: 4px;
        transition: all 0.3s;
        fill: #ccc;
      }

      &:hover {
        color: #eee;
        border-color: #eee;

        .search-icon {
          fill: #eee;
        }
      }
    }
  }

  main {
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }

  footer {
    position: fixed;
    bottom: 0;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 4px 4px;
    color: #bbb;
    font-size: 12px;

    .brand {
      display: flex;

      .icon {
        width: 16px;
        height: 16px;
        margin-left: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
        fill: #bbb;

        &:hover {
          transform: scale(1.2);
          fill: #ff9800;
        }
      }
    }

    .heart {
      display: inline-block;
      color: #e91e63;
      animation: beating-heart 30s linear 5s infinite;
    }
  }

  @keyframes beating-heart {
    0% {
      transform: scale(1);
    }

    1% {
      transform: scale(1.5);
    }

    2% {
      transform: scale(0.95);
    }

    3% {
      transform: scale(1);
    }

    4% {
      transform: scale(1.5);
    }

    5% {
      transform: scale(0.95);
    }

    6% {
      transform: scale(1);
    }
  }

  @include media-breakpoint-down(md) {
    footer .brand .icon {
      margin-left: 12px;
    }
  }
</style>
