<template>
  <div v-show="totalPage > 1" class="pagination">
    <a class="page-item" :class="{ current: currentPage === 1 }" @click="() => handleClick(1)">
      1
    </a>
    <strong v-show="middlePageList[0] > 2" class="ellipsis"> ... </strong>
    <a
      v-for="v in middlePageList"
      :key="v"
      class="page-item"
      :class="{
        current: v === currentPage,
      }"
      @click="() => handleClick(v)"
    >
      {{ v }}
    </a>
    <strong v-show="middlePageList[middlePageList.length - 1] < totalPage - 1" class="ellipsis">
      ...
    </strong>
    <a
      v-if="totalPage != 1"
      class="page-item"
      :class="{ current: currentPage === totalPage }"
      @click="() => handleClick(totalPage)"
    >
      {{ totalPage }}
    </a>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps<{
    // 当前页数
    currentPage: number;
    // 数据总数
    totalCount: number;
    // 每页展示条数
    pageSize: number;
  }>();

  const emits = defineEmits<{
    // 当前页数改变时触发
    (e: 'change', v: number): void;
  }>();

  /** 总页数 */
  const totalPage = computed(() => Math.ceil(props.totalCount / (props.pageSize || 1)));

  /** 中间页 */
  const middlePageList = computed(() => {
    const c = props.currentPage;
    const totalP = totalPage.value;
    let list: number[] = [];

    let showPrevMore = false;
    let showNextMore = false;
    const pagerCount = 5;
    const halfPagerCount = (pagerCount - 1) / 2;

    if (totalP > pagerCount) {
      if (c > pagerCount - halfPagerCount) {
        showPrevMore = true;
      }
      if (c < totalP - halfPagerCount) {
        showNextMore = true;
      }
    }

    if (showPrevMore && !showNextMore) {
      const startPage = totalP - (pagerCount - 2);
      for (let i = startPage; i < totalP; i++) {
        list.push(i);
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i++) {
        list.push(i);
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1;
      for (let i = c - offset; i <= c + offset; i++) {
        list.push(i);
      }
    } else {
      for (let i = 2; i < totalP; i++) {
        list.push(i);
      }
    }

    return list;
  });

  const handleClick = (i: number) => {
    if (i !== props.currentPage) {
      emits('change', i);
    }
  };
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    line-height: 30px;
    user-select: none;

    .page-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      margin: 0 4px;
      color: #5fd2ff;
      font-weight: bold;
      font-size: 14px;
      border: 2px solid #5fd2ff;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        color: #006f9b;
        background-color: #5fd2ff;
        border-color: #2d86a8;
      }
    }

    .current {
      color: #125675;
      background-color: #5fd2ff;
      border-color: #2d86a8;
    }

    .ellipsis {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      width: 36px;
      height: 36px;
      color: #5fd2ff;
      font-size: 14px;
    }
  }
</style>
