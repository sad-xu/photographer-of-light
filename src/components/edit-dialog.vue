<template>
  <div class="edit-dialog">
    <input class="name" v-model="albumInfo.name" placeholder="相册名..." />
    <input class="desc" v-model="albumInfo.desc" placeholder="相册简介..." />
    <div class="photo-wrapper">
      <div class="photo" v-for="(photo, i) in albumInfo.photos" :key="i"></div>
      <div class="photo-add"></div>
    </div>
    <div class="footer">
      <button>确认</button>
      <button @click="handleCancle">取消</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useStore from '@/store/app';
  import { reactive, ref } from 'vue';

  const props = defineProps<{
    albumId?: string;
  }>();

  const store = useStore();

  const isEdit = ref(!!store.detailId);
  const loading = ref(false);
  const albumInfo = reactive({
    name: '',
    desc: '',
    photos: [],
    tags: [],
  });

  if (store.detailId) {
    // 编辑
  }

  // 提交
  const handleSubmit = () => {};

  // 取消
  const handleCancle = () => {
    store.closeEdit();
  };
</script>

<style lang="scss" scoped>
  .edit-dialog {
    width: 40vw;
    min-width: 600px;

    input {
      display: block;
      padding: 4px 12px;
      color: #fff;
      font-size: 18px;
      background: #45454599;
      border: 1px solid #fff;
      border-radius: 4px;
      box-shadow: inset 0 0 4px #fff;
      transition: all 0.3s;

      &:focus {
        border-color: #2196f3;
        box-shadow: inset 0 0 4px #4da2c9;
      }

      &::placeholder {
        color: red;
      }
    }
  }

  .name {
    width: 50%;
    margin-bottom: 20px;
    font-size: 24px;
  }

  .desc {
    width: 100%;
    margin-bottom: 20px;
    padding: 4px 12px;
  }

  .photo-wrapper {
    .photo {
    }

    .photo-add {
    }
  }

  .footer {
    display: flex;
    justify-content: center;
  }
</style>
