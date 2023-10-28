<template>
  <div class="search-dialog">
    <div class="search">
      <input />
      <div>搜索</div>
    </div>
    <div class="filter">
      时间、点赞 tag:人物、风景、人族\n猫魅族\n拉拉菲尔族\n精灵族\n鲁加族\n敖龙族\n硌狮族\n维埃拉族
    </div>
    <div class="content">
      search content
      <div>上一页|下一页</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .search-dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

    .search {
      display: flex;
    }

    .filter {
    }

    .content {
      height: 50vh;
    }
  }
</style>
