<template>
  <div class="comment" :class="type">
    <img class="avatar" :src="comment.avatar" :alt="comment.ownerName" />
    <span>
      <span class="name">{{ comment.ownerName }}: </span>
      <span>{{ comment.content }}</span>
      <span class="reply-button">回复</span>
    </span>
  </div>
  <template v-for="item in comment.children ?? []" :key="item._id">
    <comment-item :comment="item" type="reply"></comment-item>
  </template>
</template>

<script lang="ts" setup>
  import { Comment } from '@/api/types';

  defineProps<{
    comment: Comment;
    type: 'comment' | 'reply';
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

    .reply-button {
      display: inline-block;
      width: 0;
      height: 0;
      overflow: hidden;
      color: #abcdff;
      font-size: 12px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s;
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
