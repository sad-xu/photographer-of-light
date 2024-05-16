<template>
  <div v-show="totalPage > 1" class="pagination">
    <a class="prev" @click="() => handlePrevNext(-1)">
      {{ '<-' }}
    </a>
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
    <a class="next" @click="() => handlePrevNext(1)">
      {{ '->' }}
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

  const emit = defineEmits<{
    // 当前页数改变时触发
    (e: 'change', v: number): void;
  }>();

  /** 总页数 */
  const totalPage = computed(() => Math.ceil(props.totalCount / (props.pageSize || 1)));

  /** 中间页 */
  const middlePageList = computed(() => {
    const c = props.currentPage;
    const totalP = totalPage.value;
    let list: number[] = [c - 2, c - 1, c, c + 1, c + 2];
    if (totalP < 5) {
      list.length = totalP;
    }
    for (let i = 0; i < list.length; i++) {
      const v = list[i];
      if (v <= 1) {
        list.splice(i, 1);
        const n = list[list.length - 1] + 1;
        if (n < totalP) {
          list.push(n);
        }
        i--;
      } else if (v >= totalP) {
        list.splice(i, 1);
        const n = list[0] - 1;
        if (n > 1) {
          list.unshift(n);
        }
        i--;
      }
    }

    return list;
  });

  const handleClick = (i: number) => {
    if (i !== props.currentPage) {
      emit('change', i);
    }
  };

  const handlePrevNext = (n: number) => {
    if (n === 1 && props.currentPage + 1 <= totalPage.value) {
      handleClick(props.currentPage + 1);
    } else if (n === -1 && props.currentPage - 1 >= 1) {
      handleClick(props.currentPage - 1);
    }
  };
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 30px;

    // .prev {
    //   transform: rotate(180deg);
    // }

    .prev,
    .next {
      width: 20px;
      height: 20px;
      margin: 8px;

      // background: url('@/assets/nav-arrow.png') center / contain no-repeat;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }

    .page-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      margin: 0 4px;
      color: #5fd2ff;
      font-size: 14px;
      border: 1px solid #5fd2ff;
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
      color: #006f9b;
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
