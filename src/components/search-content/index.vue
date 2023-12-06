<template>
  <div class="search-content">
    <div>
      <div class="search">
        <input id="search-input" v-model="kw" maxlength="10" placeholder="请输入关键词..." />
        <button class="search-button" @click="handleSearch">搜索</button>
      </div>
      <div class="filter">
        <svg
          class="sort-icon"
          :class="{ 'item-selected': filterConfig.order === 'time' }"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          @click="changeFilter('order', 'time')"
        >
          <path
            d="M233.1 221.8c-36.8 35.1-66.2 76.1-87.4 121.8-6 12.8-0.4 28.1 12.5 34 12.8 6 28.1 0.4 34-12.5 18.5-39.9 44.2-75.7 76.3-106.3C409 124.8 632.3 130 766.4 270.4c65 68 99.5 157.3 97.3 251.3-2.2 94-40.9 181.6-108.9 246.6C614.4 902.4 391 897.2 256.9 756.7c-65.6-68.7-100.1-158.9-97.3-253.8 0.4-14.2-10.7-26-24.8-26.4-14.2-0.4-26 10.7-26.4 24.8-3.3 108.8 36.3 212 111.4 290.8C299 875 405.3 916.8 511.7 916.8c100.2 0 200.5-37 278.5-111.4S912.5 630.7 915 523c2.5-107.7-37.1-210-111.5-287.9-153.6-161-409.5-167-570.4-13.3z"
          ></path>
          <path
            d="M511.5 316.4c-14.2 0-25.6 11.5-25.6 25.6v169.1c0 6.8 2.7 13.4 7.6 18.2l170.8 169.1c5 5 11.5 7.4 18 7.4 6.6 0 13.2-2.5 18.2-7.6 10-10.1 9.9-26.3-0.2-36.2L537.2 500.4V342c0-14.1-11.5-25.6-25.7-25.6z"
          ></path>
        </svg>
        <svg
          class="sort-icon"
          :class="{ 'item-selected': filterConfig.order === 'like' }"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          @click="changeFilter('order', 'like')"
        >
          <path
            d="M262.1 628.7L228.6 824c-4.8 28 6.5 55.9 29.5 72.6 13 9.5 28.2 14.3 43.6 14.3 11.8 0 23.7-2.8 34.6-8.6l175.4-92.2 175.4 92.2c25.2 13.2 55.1 11.1 78.2-5.6 23-16.7 34.3-44.5 29.5-72.6l-33.5-195.3 141.9-138.3c20.4-19.9 27.6-49 18.8-76.1-8.8-27.1-31.8-46.4-59.9-50.5L666 335.4l-87.7-177.7c-12.6-25.5-38.1-41.4-66.6-41.4-28.5 0-54 15.9-66.6 41.4l-10 20.3c-6.3 12.7-1.1 28.1 11.6 34.3 12.7 6.3 28.1 1.1 34.3-11.6l10-20.3c5.7-11.5 16.3-12.8 20.6-12.8 4.3 0 14.9 1.2 20.6 12.8l93.7 189.8c3.7 7.6 10.9 12.8 19.3 14l209.5 30.4c13.1 1.9 17.5 12.4 18.5 15.6 1.3 4.1 3.4 14.5-5.8 23.5L715.8 601.4c-6 5.9-8.8 14.4-7.4 22.7l35.8 208.6c2.2 13-6.4 20.5-9.1 22.4-3.5 2.5-12.8 7.7-24.2 1.7l-187.3-98.5c-7.5-3.9-16.4-3.9-23.9 0l-187.3 98.5c-11.4 6-20.7 0.8-24.2-1.7-2.7-2-11.4-9.4-9.1-22.4l35.8-208.6c1.4-8.3-1.3-16.8-7.4-22.7L155.9 453.7c-9.2-9-7.1-19.5-5.8-23.5 1.3-4.1 5.8-13.8 18.5-15.6l209.5-30.4c8.4-1.2 15.6-6.5 19.3-14l16.8-34c6.3-12.7 1.1-28.1-11.6-34.3-12.7-6.3-28.1-1.1-34.3 11.6l-10.8 21.9-196.1 28.5c-28.2 4.1-51.1 23.5-59.9 50.5-8.8 27.1-1.6 56.2 18.8 76.1l141.8 138.2z"
          ></path>
          <path
            d="M377.5 515.6c0 74.2 60.4 134.6 134.6 134.6 73.7 0 133.7-60.4 133.7-134.6 0-14.2-11.5-25.6-25.6-25.6-14.2 0-25.6 11.5-25.6 25.6 0 45.9-37 83.3-82.4 83.3-45.9 0-83.3-37.4-83.3-83.3 0-14.2-11.5-25.6-25.6-25.6-14.3 0-25.8 11.4-25.8 25.6z"
          ></path>
        </svg>
        <span class="type-name">类别：</span>
        <span
          class="type-item"
          :class="{ 'item-selected': filterConfig.type === item.value }"
          v-for="item in PHOTO_TYPE_LIST"
          :key="item.label"
          @click="changeFilter('type', item.value)"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
    <div class="content" :class="{ 'content-show': showContent }">
      <x-loading v-if="loading" class="loading"></x-loading>
      <div class="album-wrapper" :class="{ 'album-wrapper-loading': loading }">
        <div v-for="item in albumList" :key="item.id" class="album">
          <div class="album-header">
            <div class="header-left" @click="selectAlbum(item)">{{ item.name }}</div>
            <div class="header-right">
              <div class="icon-wrapper">
                <svg
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M510.464 880.64v-282.298182h84.712727l28.253091-56.459636h169.332364l28.253091 56.459636h84.712727v282.298182z m112.919273-141.172364a84.666182 84.666182 0 1 0 84.666182-84.666181 84.666182 84.666182 0 0 0-84.666182 84.666181zM115.2 880.64a353.373091 353.373091 0 0 1 269.172364-349.649455 225.931636 225.931636 0 1 1 221.184-47.569454h-35.374546l-46.312727 47.429818h-0.232727l-70.981819 72.704v276.898909z"
                    fill="#03a9f4"
                  ></path>
                </svg>
                {{ item.userName }}
              </div>
              <div class="icon-wrapper">
                <svg
                  class="icon"
                  viewBox="0 0 1297 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1287.926378 191.342357a45.040094 45.040094 0 0 0-29.464269-17.685051l-119.301084-17.360555-21.757481-119.25241A45.040094 45.040094 0 0 0 1065.240755 0.70075l-436.934339 81.286336L288.44516 32.501392a44.780497 44.780497 0 0 0-50.75123 38.29057l-12.282186 85.991534-188.69463 35.045606a44.553349 44.553349 0 0 0-28.831501 18.820788 45.753986 45.753986 0 0 0-7.13892 33.909869l135.412329 742.285409a45.299691 45.299691 0 0 0 18.642315 29.042423 43.904357 43.904357 0 0 0 25.440514 8.112409 45.543063 45.543063 0 0 0 8.112409-0.811241l601.08082-111.788994 356.118523 51.919417a44.08283 44.08283 0 0 0 6.489927 0.486744 44.92652 44.92652 0 0 0 44.293752-38.777314l13.109653-91.507971 7.463416-1.460234a45.234792 45.234792 0 0 0 35.970421-52.730657l-20.03765-109.679768 63.601285-444.722252a45.591738 45.591738 0 0 0-8.518029-33.585373z m-105.866935 200.052002l-40.0753 280.040353-12.071264 84.855797-13.515273 94.428438-2.401273 16.711563-48.804252-7.13892-277.444382-40.399796-554.888764-80.799592 72.200438-505.078574 13.499049-94.590687 1.622481-11.032876 32.546985 4.705197 277.444382 40.399796 432.650988 63.114541 93.633422 13.628847 44.95897 6.489927zM1037.398968 97.887408l8.112409 44.780496-139.776804-20.281022zM96.992312 272.628694l114.920383-21.416759-52.195238 365.220645z m119.203735 653.373407l-18.334044-100.593869 314.063796 45.753986z m298.131025-497.128413a82.032678 82.032678 0 1 0-68.906801-92.968205 81.497259 81.497259 0 0 0 68.906801 92.968205z m495.359908 77.067884l-81.708182 85.504789-102.978918-204.919447L629.26368 613.512113s-233.134405-132.719008-303.90706 48.512205l716.260801 109.193023z"
                    fill="#fbbd60"
                  ></path>
                </svg>
                {{ item.photoNum }}
              </div>
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
                {{ item.commentNum }}
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
                {{ item.star }}
              </div>
            </div>
          </div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </div>
      <search-pagination
        v-show="showContent && totalCount"
        :currentPage="currentPage"
        :totalCount="totalCount"
        :pageSize="15"
        @change="handlePageChange"
      ></search-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { mockRequest } from '@/api/album';
  import { Album, AlbumType } from '@/api/types';
  import { reactive, ref } from 'vue';
  import XLoading from '@/common/x-loading.vue';
  import SearchPagination from './search-pagination.vue';

  const emits = defineEmits<{
    (e: 'close', id: string): void;
  }>();

  const PHOTO_TYPE_LIST = [
    { label: '全部', value: '' },
    { label: '人像', value: AlbumType.portrait },
    { label: '景物', value: AlbumType.still },
  ];

  const showContent = ref(false);
  const filterConfig = reactive({
    order: 'time', // time like
    type: '', // portrait  still
  });
  const kw = ref('');
  const loading = ref(false);
  const albumList = ref<Album[]>([]);
  const currentPage = ref(1);
  const totalCount = ref(0);

  let t = 0;

  const changeFilter = (key: string, val: string) => {
    if (key === 'order') {
      filterConfig.order = val;
    } else if (key === 'type') {
      filterConfig.type = val;
    }
  };

  const handleSearch = () => {
    showContent.value = true;
    if (loading.value) return;
    loading.value = true;
    const now = +new Date();
    t = now;
    mockRequest(
      {
        total: 80,
        list: Array.from({ length: 15 }).map((_, i) => ({
          id: `id${i}`,
          name: `mock album${i}`,
          userId: 'userid',
          userName: `用户${i}`,
          desc: 'descdesc',
          star: Math.round(Math.random() * 100),
          photoNum: 12,
          commentNum: 6,
          createTime: 1698843600,
          updateTime: 1699716600,
          type: 1,
        })),
      },
      2000
    )
      .then((res: any) => {
        if (t === now) {
          totalCount.value = res.total;
          albumList.value = res.list;
        }
      })
      .finally(() => {
        if (t === now) {
          loading.value = false;
        }
      });
  };

  // 翻页
  const handlePageChange = (page: number) => {
    currentPage.value = page;
    handleSearch();
  };

  // 选中
  const selectAlbum = (album: Album) => {
    emits('close', album.id);
  };
</script>

<style lang="scss" scoped>
  $selected-color: #03a9f4;

  .search-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

    .search {
      display: flex;

      #search-input {
        width: 250px;
        padding: 8px 12px;
        color: #fff;
        font-size: 22px;
        background: #45454599;
        border: 1px solid #999;
        border-radius: 4px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        transition: all 0.15s;

        &:focus {
          border-color: #2196f3;
          box-shadow: inset 0 0 4px #4da2c9;
        }

        &::placeholder {
          color: #999;
          font-size: 18px;
        }
      }

      .search-button {
        padding: 8px 16px;
        color: #eee;
        font-size: 18px;
        background-color: #485e69;
        border: 1px solid #666;
        border-radius: 8px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        cursor: pointer;
        transition: all 0.15s;

        &:hover {
          color: #fff;
          background-color: #737373;
          box-shadow: 0 0 4px #666;
        }

        &:active {
          background-color: #3f51b5;
        }
      }
    }

    .filter {
      display: flex;
      align-items: center;
      height: 30px;
      margin: 16px 0 12px;
      padding-left: 8px;
      font-size: 14px;
      line-height: 30px;

      .sort-icon {
        width: 22px;
        height: 22px;
        margin-right: 20px;
        cursor: pointer;
        transition: all 0.3s;
        fill: #fff;

        &:hover {
          fill: $selected-color;
        }
      }

      .type-name {
        padding-left: 20px;
        border-left: 1px solid #999;
      }

      .type-item {
        margin-right: 10px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          color: $selected-color;
        }
      }

      .item-selected {
        color: $selected-color;
        fill: $selected-color;
      }
    }

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 0;
      margin-top: 12px;
      overflow: auto;
      transform: scale(0);
      opacity: 0;
      transition: all 0.3s ease-in-out;

      .loading {
        position: absolute;
        top: 0;
        bottom: 36px;
        left: 0;
        width: 100%;
        padding-top: 10vh;
      }
    }

    .content-show {
      width: 65vw;
      height: 65vh;
      transform: scale(1);
      opacity: 1;
    }

    .album-wrapper {
      flex: 1;
      width: 100%;
      padding: 4px 0;
      overflow-y: auto;
      transition: filter 0.3s;

      .album {
        margin: 0 12px;
        padding: 8px 12px;
        border-bottom: 1px dashed #9e9e9e;

        .album-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .header-left {
            font-weight: bold;
            cursor: pointer;
            transition: all 0.15s;

            &:hover {
              color: #2196f3;
            }
          }

          .header-right {
            display: flex;

            .icon-wrapper {
              display: flex;
              align-items: center;
              min-width: 50px;
              margin-left: 16px;

              .icon {
                width: 20px;
                height: 20px;
                margin-right: 4px;
              }
            }
          }
        }

        .desc {
          margin-top: 4px;
          color: #bbb;
        }
      }
    }

    .album-wrapper-loading {
      filter: blur(3px);
    }
  }

  @include media-breakpoint-down(md) {
    .search-content .content-show {
      width: 100vw;
      height: 70vh;
    }
  }
</style>
