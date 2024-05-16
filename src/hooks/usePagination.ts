import { ref } from 'vue';

const usePagination = (request: (o: any) => Promise<any>) => {
  const loading = ref(false);
  const currentPage = ref(1);
  const totalCount = ref(0);
  const pageSize = ref(10);
  const totalPageCount = ref(1);
  const otherParams = ref<any>({});

  const data = ref<any>([]);

  let t = 0;

  const setCurrentPage = (page: number) => {
    currentPage.value = page;
  };
  const setPageSize = (v: number) => {
    pageSize.value = v;
  };
  const setOtherParams = (v: any) => {
    otherParams.value = v;
  };

  // 重新请求
  const reRequest = () => {
    loading.value = true;
    const now = +new Date();
    t = now;
    return request({
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
      ...otherParams.value,
    })
      .then((res) => {
        if (now === t) {
          const d = res;
          data.value = d.data || [];
          totalCount.value = d.totalCount || 0;
          totalPageCount.value = d.totalPages || 0;
        }
      })
      .finally(() => {
        if (now === t) {
          loading.value = false;
        }
      });
  };

  // 手动翻页
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    reRequest();
  };

  // 手动修改每页条数
  const handlePageSizeChange = (v: number) => {
    setPageSize(v);
    reRequest();
  };

  return {
    data,
    currentPage,
    totalCount,
    pageSize,
    loading,
    otherParams,
    setCurrentPage,
    setPageSize,
    setOtherParams,
    reRequest,
    handlePageChange,
    handlePageSizeChange,
  };
};

export default usePagination;
