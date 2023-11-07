<template>
  <div class="comment-part">
    <div class="c-content">
      <template v-for="item in comments" :key="item._id">
        <comment-item :comment="item" type="comment"></comment-item>
      </template>
    </div>
    <div class="c-input">
      <input class="send-input" v-model="inputVal" />
      <button class="send-button" :class="loading ? 'send-button-loading' : ''" @click="handleSend">
        发送
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Comment } from '@/api/types';
  import { ref, watch } from 'vue';
  import CommentItem from './comment-item.vue';

  const props = defineProps<{
    // 评论列表
    commentList: Comment[];
  }>();

  const inputVal = ref('');
  const loading = ref(false);
  // 被回复的留言
  const replied = ref<Comment>();

  // 排列后的评论列表
  const comments = ref<Comment[]>([]);

  watch(
    () => props.commentList,
    (val) => {
      comments.value = generateSortedComments(val);
    }
  );

  // 生成排列后的评论列表
  const generateSortedComments = (clist: Comment[]) => {
    const list: Comment[] = [];
    const map: { [_: string]: Comment } = {};
    clist.forEach((item) => {
      map[item._id] = item;
      if (!item.replyId) {
        list.push(item);
      } else {
        const target = map[item.replyId];
        if (target) {
          if (!target.children) target.children = [];
          target.children.push(item);
        }
      }
    });
    console.log(map, list);
    return list;
  };

  // 发送评论
  const handleSend = () => {
    loading.value = true;

    loading.value = false;
  };
</script>

<style lang="scss" scoped>
  .comment-part {
    position: absolute;
    bottom: 75px;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 150px;
    overflow: hidden;
    background-color: #3a3a3a99;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    opacity: 0.3;
    transition: all 0.3s;

    .c-content {
      max-height: 80vh;
      padding: 4px 0;
      overflow: auto;
      font-size: 14px;
      line-height: 20px;
      word-break: break-all;
    }

    .c-input {
      display: flex;
      flex-shrink: 0;
      height: 30px;

      .send-input {
        width: 100%;
        padding: 0 4px;
        border: 1px solid transparent;
        transition: all 0.15s;

        &:focus {
          border-color: #2196f3;
          box-shadow: inset 0 0 4px #4da2c9;
        }
      }

      .send-button {
        flex-shrink: 0;
        padding: 0 8px;
        color: #fff;
        font-size: 12px;
        background-color: rgb(22 93 255);
        border: none;
        cursor: pointer;
        transition: padding 0.3s;

        &:hover {
          background-color: rgb(64 128 255);
        }

        &:active {
          background-color: rgb(14 66 210);
        }
      }

      .send-button-loading {
        pointer-events: none;
      }
    }

    &:hover {
      z-index: 3;
      width: 220px;
      opacity: 1;

      .c-content :deep {
        .name {
          animation: comment-name 0.5s;
          animation-fill-mode: forwards;
        }

        .reply-button {
          animation: comment-reply-button 0.5s;
          animation-fill-mode: forwards;
        }
      }

      .c-input {
        .send-button {
          padding-right: 12px;
          padding-left: 12px;
        }
      }
    }
  }

  @keyframes comment-name {
    0% {
      width: 0;
      height: 0;
      opacity: 0;
    }

    100% {
      width: initial;
      height: initial;
      overflow: visible;
      opacity: 1;
    }
  }

  @keyframes comment-reply-button {
    0% {
      width: 0;
      height: 0;
    }

    100% {
      width: initial;
      height: initial;
      overflow: visible;
    }
  }
</style>
