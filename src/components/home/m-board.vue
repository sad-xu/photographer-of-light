<template>
  <div class="m-board">
    <div class="tabbar">
      <div class="tab-bg" :style="{ left: `${currentTabIndex * 25}%` }"></div>
      <div
        v-for="(tab, i) in tabBar"
        :key="tab.value"
        class="tab"
        :class="{ 'selected-tab': i === currentTabIndex }"
        @click="handleSelectTag(i)"
      >
        <span>{{ tab.label }}</span>
        <span class="sub-title">{{ tab.subLabel }}</span>
      </div>
    </div>
    <Transition name="board" mode="out-in">
      <div
        :key="props.board[currentTabKey].length ? props.board[currentTabKey][0].id : 1"
        ref="boardBodyRef"
        class="board-body"
      >
        <div
          v-for="(album, i) in props.board[currentTabKey]"
          :key="album.id"
          class="album"
          :style="{ 'transition-delay': `${i * 0.05}s` }"
          @click="jumpToDetail(album.id)"
        >
          <div class="album-header">
            <span class="name">{{ album.name }}</span>
            <div class="icon-wrapper" v-if="currentTabKey === 'likest'">
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
              <span>{{ album.star }}</span>
            </div>
            <div class="icon-wrapper" v-if="currentTabKey === 'commentest'">
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
              <span>{{ album.commentNum }}</span>
            </div>
            <div class="time" v-if="currentTabKey === 'latest'">
              {{ formatDate(album.updateTime) }}
            </div>
          </div>
          <div class="desc">{{ album.desc }}</div>
          <div class="album-footer">
            <span>{{ album.userName }}</span>
            <thumbnails-group
              :photoNum="album.photoNum"
              :thumbnails="album.thumbnails"
            ></thumbnails-group>
          </div>
        </div>
      </div>
    </Transition>
    <!--  -->
    <div
      class="refresh-random"
      :class="{
        'refresh-random-active': currentTabKey === 'random',
      }"
      @click="emits('refresh-random')"
    >
      <svg
        class="refresh-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        :class="{ 'refresh-loading': refreshLoading }"
      >
        <path
          d="M896 198.4 896 198.4l0 179.2 0 0c0 19.2-6.4 32-19.2 44.8-12.8 12.8-32 19.2-44.8 19.2l0 0-179.2 0 0 0c-19.2 0-32-6.4-44.8-19.2-25.6-25.6-25.6-64 0-89.6C620.8 320 633.6 313.6 652.8 313.6l0 0 25.6 0C627.2 275.2 576 256 518.4 256 441.6 256 377.6 281.6 332.8 332.8l0 0c-25.6 25.6-64 25.6-89.6 0-25.6-25.6-25.6-64 0-89.6l0 0C313.6 172.8 409.6 128 518.4 128c96 0 185.6 38.4 249.6 96L768 198.4l0 0c0-19.2 6.4-32 19.2-44.8 25.6-25.6 64-25.6 89.6 0C889.6 160 896 179.2 896 198.4zM416 691.2c-12.8 12.8-32 19.2-44.8 19.2l0 0L352 710.4C396.8 748.8 448 768 505.6 768c70.4 0 134.4-25.6 179.2-76.8l0 0c25.6-25.6 64-25.6 89.6 0 25.6 25.6 25.6 64 0 89.6l0 0C710.4 851.2 614.4 896 505.6 896c-96 0-185.6-38.4-249.6-96l0 32 0 0c0 19.2-6.4 32-19.2 44.8-25.6 25.6-64 25.6-89.6 0C134.4 864 128 844.8 128 825.6l0 0 0-179.2 0 0c0-19.2 6.4-32 19.2-44.8C160 588.8 172.8 582.4 192 582.4l0 0 179.2 0 0 0c19.2 0 32 6.4 44.8 19.2C441.6 627.2 441.6 665.6 416 691.2z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { formatDate } from '@/utils';
  import ThumbnailsGroup from './thumbnails-group.vue';
  import useStore from '@/store/app';

  const props = defineProps<{
    board: any;
    refreshLoading: boolean;
  }>();

  const emits = defineEmits<{
    (e: 'refresh-random'): void;
  }>();

  const store = useStore();

  const currentTabIndex = ref(0);
  const tabBar = ref([
    { label: '最新变动', subLabel: 'Latest', value: 'latest' },
    { label: '最多喜欢', subLabel: 'Likest', value: 'likest' },
    { label: '最多评论', subLabel: 'Commentest', value: 'commentest' },
    { label: '随便看看', subLabel: 'Random', value: 'random' },
  ]);
  const boardBodyRef = ref();

  const currentTabKey = computed(() => {
    return tabBar.value[currentTabIndex.value].value;
  });

  /** 选中标签 自动回到顶部 */
  const handleSelectTag = (i: number) => {
    currentTabIndex.value = i;
    boardBodyRef.value.scrollTop = 0;
  };

  /** 打开详情 */
  const jumpToDetail = (id: string) => {
    store.setDetailId(id);
  };
</script>

<style lang="scss" scoped>
  .board-enter-active,
  .board-leave-active {
    transition: all 0.3s ease-out;
  }

  .board-enter-from {
    transform: translateY(-15px);
    opacity: 0;
  }

  .board-leave-to {
    transform: translateY(30px);
    opacity: 0;
  }

  .m-board {
    position: absolute;
    top: calc(15vh + 50px);
    z-index: 3;
    display: flex;
    flex-direction: column;
    width: 80vw;
    max-width: 680px;
    height: 70vh;
    background-color: #1e1e1e66;
    border-radius: 8px;
    box-shadow: 0 0 6px rgb(0 0 0 / 40%);
    backdrop-filter: blur(2px);

    .tabbar {
      position: relative;
      display: flex;
      height: 48px;
      overflow: hidden;
      font-size: 15px;
      border-bottom: 1px solid rgb(158 158 158 / 50%);
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;

      .tab-bg {
        position: absolute;
        left: 0;
        width: 25%;
        height: 100%;
        background-color: rgb(233 233 233 / 50%);
        transition: left 0.3s cubic-bezier(0.65, 0.05, 0.36, 1);
      }

      .tab {
        z-index: 1;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #eee;
        transition: all 0.3s;

        .sub-title {
          margin-top: 2px;
          color: #bbb;
          font-size: 12px;
          font-family: EORZEA, sans-serif;
        }
      }

      .selected-tab {
        color: #353434;
        font-weight: bold;

        .sub-title {
          color: #444;
        }
      }
    }

    .board-body {
      flex: 1;
      overflow-y: auto;

      .album {
        position: relative;
        padding: 8px 4px 4px 12px;
        border-bottom: 1px solid rgb(153 153 153 / 80%);

        &:last-of-type {
          border-bottom-color: transparent;
        }

        .album-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 4px;
          line-height: 24px;

          .name {
            font-size: 18px;
            word-break: break-all;
          }

          .icon-wrapper {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: flex-end;
            min-width: 46px;
            margin-left: 12px;
            font-size: 14px;

            .icon {
              width: 20px;
              height: 20px;
              margin-right: 4px;
            }
          }

          .time {
            font-size: 14px;
          }
        }

        .desc {
          display: -webkit-box;
          overflow: hidden;
          color: #ddd;
          font-size: 14px;
          text-overflow: ellipsis;
          word-break: break-all;
          cursor: pointer;
          transition: color 0.15s;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;

          // white-space: nowrap;
        }

        .album-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 22px;
          margin-top: 4px;
          font-size: 13px;
        }
      }
    }
  }

  .refresh-random {
    position: absolute;
    top: -20px;
    right: calc(12.5% - 14px);
    padding: 4px;
    font-size: 0;
    background-color: #526e7b;
    border-radius: 100%;
    transform: rotate(-90deg);
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
    pointer-events: none;

    .refresh-icon {
      width: 20px;
      height: 20px;
      transition: all 0.3s;
      fill: #fff;
    }
  }

  .refresh-random-active {
    transform: translateY(-15px) rotate(0deg);
    opacity: 1;
    pointer-events: initial;
  }

  .refresh-loading {
    animation: rotate 1s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: scale(1.15) rotate(0);
    }

    100% {
      transform: scale(1.15) rotate(360deg);
    }
  }

  @include media-breakpoint-down(sm) {
    .m-board {
      width: 90vw;
    }
  }
</style>
