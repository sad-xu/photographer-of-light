<template>
  <div class="comment" :class="type">
    <img class="avatar" :src="comment.avatar" :alt="comment.replierName" />
    <span style="vertical-align: middle">
      <span class="name">{{ comment.replierName }}: </span>
      <del v-if="comment.deleted">已删除</del>
      <span v-else>{{ comment.content }}</span>
      <span
        v-if="comment.replierId != store._id && !comment.deleted"
        class="button"
        @click="() => emits('reply', comment)"
      >
        回复
      </span>
      <span
        v-if="comment.replierId == store._id && !comment.deleted && !readyDelete"
        class="button delete-button"
        @click="deleteConfirm"
      >
        删除
      </span>
      <span v-if="readyDelete" class="button confirm-button" @click="handleDelete(comment)">
        确认
      </span>
      <span v-if="readyDelete" class="button cancel-button" @click="readyDelete = false">取消</span>
    </span>
  </div>
  <template v-for="item in comment.children ?? []" :key="item._id">
    <comment-item :comment="item" type="reply" @reply="(c) => emits('reply', c)"></comment-item>
  </template>
</template>

<script lang="ts" setup>
  import { Comment } from '@/api/types';
  import useStore from '@/store/app';
  import { ref } from 'vue';

  const store = useStore();

  defineProps<{
    comment: Comment;
    type: 'comment' | 'reply';
  }>();

  const emits = defineEmits<{
    (e: 'reply', comment: Comment): void;
    (e: 'delete', comment: Comment): void;
  }>();

  const readyDelete = ref(false);

  /** 删除二次确认 */
  const deleteConfirm = () => {
    readyDelete.value = true;
  };

  const handleDelete = (comment: Comment) => {
    emits('delete', comment);
    readyDelete.value = false;
  };
</script>

<style lang="scss" scoped>
  .comment {
    padding: 4px;

    .avatar {
      width: 20px;
      height: 20px;
      margin-right: 4px;
      border-radius: 100%;
    }

    .name {
      display: inline-block;
      width: 0;
      height: 0;
      margin-right: 4px;
      overflow: hidden;
      color: #c5c5c5;
    }

    del {
      color: #9e9e9e;
    }

    .button {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 4px;
      overflow: hidden;
      color: #abcdff;
      font-size: 12px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .delete-button {
      color: #e59a82;
    }

    .confirm-button {
      color: #999;

      &:hover {
        color: #2196f3;
      }
    }

    .cancel-button {
      color: #999;

      &:hover {
        color: #ccc;
      }
    }

    &:hover {
      .button {
        opacity: 1;
      }
    }
  }

  .reply {
    padding-left: 20px;
  }
</style>
