<template>
  <div class="comment" :class="type">
    <img class="avatar" :src="comment.avatar" :alt="comment.ownerName" />
    <span style="vertical-align: middle">
      <span class="name">{{ comment.ownerName }}: </span>
      <del v-if="comment.deleted">已删除</del>
      <span v-else>{{ comment.content }}</span>
      <span
        v-if="comment.ownerId != storeUserId && !comment.deleted"
        class="reply-button"
        @click="() => emits('reply', comment)"
      >
        回复
      </span>
      <span
        v-if="comment.ownerId == storeUserId && !comment.deleted"
        class="reply-button delete-button"
        @click="() => emits('delete', comment)"
      >
        删除
      </span>
    </span>
  </div>
  <template v-for="item in comment.children ?? []" :key="item._id">
    <comment-item :comment="item" type="reply" @reply="(c) => emits('reply', c)"></comment-item>
  </template>
</template>

<script lang="ts" setup>
  import { Comment } from '@/api/types';
  import { STORE_USER_ID } from '@/provide';
  import { inject } from 'vue';

  const storeUserId = inject(STORE_USER_ID);

  defineProps<{
    comment: Comment;
    type: 'comment' | 'reply';
  }>();

  const emits = defineEmits<{
    (e: 'reply', comment: Comment): void;
    (e: 'delete', comment: Comment): void;
  }>();
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

    .reply-button {
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

    &:hover {
      .reply-button {
        opacity: 1;
      }
    }
  }

  .reply {
    padding-left: 20px;
  }
</style>
