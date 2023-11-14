<template>
  <div class="search-content">
    <div>
      <div class="search">
        <input class="search-input" v-model="kw" maxlength="10" placeholder="请输入关键词..." />
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
      <div class="album-wrapper">
        <div v-for="i in 15" :key="i" class="album"></div>
      </div>
      <div class="pagination">
        <div>上一页|下一页</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';

  const PHOTO_TYPE_LIST = [
    { label: '全部', value: '' },
    { label: '人像', value: 'portrait' },
    { label: '景物', value: 'still' },
  ];

  const kw = ref('');
  const showContent = ref(false);
  const filterConfig = reactive({
    order: 'time', // time like
    type: 'portrait', // portrait  still
  });
  const albumList = ref([]);
  const total = ref(100);

  const changeFilter = (key: string, val: string) => {
    if (key === 'order') {
      filterConfig.order = val;
    } else if (key === 'type') {
      filterConfig.type = val;
    }
  };

  const handleSearch = () => {
    showContent.value = !showContent.value;
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

      .search-input {
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
        background-color: #494949;
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
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 0;
      overflow: auto;
      opacity: 0;
      transition: all 0.5s ease-in-out;
    }

    .content-show {
      height: 65vh;
      opacity: 1;
    }

    .album-wrapper {
      flex: 1;
      width: 65vw;
      overflow-y: auto;

      .album {
        height: 50px;
        border-bottom: 1px solid #eee;

        &:last-of-type {
          border-bottom: 0;
        }
      }
    }

    .pagination {
    }
  }
</style>
