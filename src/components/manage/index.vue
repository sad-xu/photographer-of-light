<template>
  <div v-if="isAdmin && !initLoading" class="manager">
    <div class="list-wrapper">
      <div>
        <button class="create-button" @click="openCreate">新建</button>
      </div>
      <div>
        <div
          class="album"
          :class="currentAlbumId === item.id ? 'current-album' : ''"
          v-for="(item, i) in tableData"
          :key="i"
          @click="currentAlbumId = item.id"
        >
          <span>{{ item.id }} - {{ item.name }}</span>
          <div class="desc">{{ item.desc }}</div>
        </div>
        <x-pagination
          class="pagination"
          :current-page="currentPage"
          :total-count="totalCount"
          :page-size="pageSize"
          @change="handlePageChange"
        ></x-pagination>
      </div>
    </div>
    <div v-show="currentAlbumId" class="detail-wrapper">
      <edit-content :album-id="currentAlbumId"></edit-content>
    </div>
  </div>
  <hello v-if="!isAdmin && !initLoading"></hello>
  <x-loading v-if="initLoading" class="loading"></x-loading>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import usePagination from '@/hooks/usePagination';
  import XPagination from '@/common/x-pagination.vue';
  import EditContent from '@/components/edit-content/index.vue';
  import Hello from './hello.vue';
  import XLoading from '@/common/x-loading.vue';
  import { mockAlbums } from '@/utils/mock';
  import { mockRequest } from '@/api/album';

  /** 是否是管理员 */
  const isAdmin = ref(false);

  const initLoading = ref(true);

  /** 当前相册 */
  const currentAlbumId = ref('');

  const {
    data: tableData,
    currentPage,
    totalCount,
    pageSize,
    loading,
    setCurrentPage,
    setOtherParams,
    reRequest,
    handlePageChange,
  } = usePagination(() =>
    Promise.resolve({
      totalCount: 100,
      totalPages: 10,
      data: mockAlbums,
    })
  );

  const handleSearch = () => {
    const params: any = {};
    setCurrentPage(1);
    setOtherParams(params);
    reRequest();
  };

  // 1.验证管理员 2.请求列表
  mockRequest(true)
    .then((flag) => {
      if (flag) {
        isAdmin.value = true;
        handleSearch();
      } else {
        isAdmin.value = false;
      }
    })
    .finally(() => {
      initLoading.value = false;
    });

  /** 新建 */
  const openCreate = () => {
    currentAlbumId.value = '-1';
  };
</script>

<style lang="scss" scoped>
  .loading {
    position: absolute;
    top: 20vh;
    width: 100%;
  }

  .manager {
    display: flex;
    justify-content: center;
    padding-top: 5vh;
  }

  .list-wrapper {
    width: 40vw;
    max-width: 500px;
    height: 90vh;
    margin-right: 12px;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 4px;

    .create-button {
      margin-bottom: 8px;
      padding: 4px 8px;
      cursor: pointer;
    }

    .album {
      padding: 4px;
      cursor: pointer;
      transition: all 0.3s;

      .desc {
        padding-left: 1em;
      }

      &:hover {
        color: #03a9f4;
        background-color: #022433;
      }
    }

    .current-album {
      color: #03a9f4;
    }

    .pagination {
      margin-top: 20px;
    }
  }

  .detail-wrapper {
    width: 50vw;
    height: 90vh;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
</style>
