<template>
  <div class="search-content">
    <div class="search">
      <input class="search-input" v-model="kw" maxlength="10" placeholder="请输入关键词..." />
      <button class="search-button">搜索</button>
    </div>
    <div class="filter">
      时间、点赞 tag:人物、风景、人族\n猫魅族\n拉拉菲尔族\n精灵族\n鲁加族\n敖龙族\n硌狮族\n维埃拉族
    </div>
    <div class="content">search content</div>
    <div class="pagination">
      <div>上一页|下一页</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onActivated } from 'vue';

  const kw = ref('');
</script>

<script lang="ts">
  export default {
    name: 'XXX',
  };
</script>

<style lang="scss" scoped>
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
    }

    .content {
      height: 50vh;
    }

    .pagination {
    }
  }
</style>
