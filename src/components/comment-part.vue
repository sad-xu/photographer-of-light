<template>
  <div class="comment-part">
    <div class="c-content">
      <template v-for="item in comments" :key="item._id">
        <div class="comment">
          <img class="avatar" :src="item.avatar" :alt="item.ownerName" />
          <span>
            <span class="name">{{ item.ownerName }}: </span>
            <span class="content">{{ item.content }}</span>
            <span class="reply-button">回复</span>
          </span>
        </div>
        <div class="reply" v-for="child in item.children ?? []" :key="child._id">
          <img class="avatar" :src="child.avatar" :alt="child.ownerName" />
          <span>
            <span class="name">{{ child.ownerName }}: </span>
            <span class="content">{{ child.content }}</span>
            <span class="reply-button">回复</span>
          </span>
        </div>
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
      if (!item.replyId) {
        map[item._id] = item;
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
    width: 150px;
    opacity: 0.3;
    transition: all 0.3s;
    justify-content: flex-end;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #3a3a3a99;
    overflow: hidden;
    .c-content {
      overflow: auto;
      word-break: break-all;
      max-height: 80vh;
      font-size: 14px;
      padding: 4px 0;
      line-height: 20px;
      .comment,
      .reply {
        padding: 4px;
        .avatar {
          width: 20px;
          height: 20px;
          border-radius: 100%;
          margin-right: 4px;
        }
        .name {
          display: inline-block;
          width: 0;
          height: 0;
          overflow: hidden;
          color: #c5c5c5;
          margin-right: 4px;
        }
        .content {
        }
        .reply-button {
          display: inline-block;
          width: 0;
          height: 0;
          overflow: hidden;
          opacity: 0;
          font-size: 12px;
          color: #abcdff;
          transition: opacity 0.3s;
          cursor: pointer;
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
        border: none;
        padding: 0 8px;
        color: #fff;
        font-size: 12px;
        background-color: rgb(22, 93, 255);
        cursor: pointer;
        transition: padding 0.3s;
        &:hover {
          background-color: rgb(64, 128, 255);
        }
        &:active {
          background-color: rgb(14, 66, 210);
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

      .c-content {
        .comment,
        .reply {
          .name {
            animation: comment-name 0.5s;
            animation-fill-mode: forwards;
          }
          .reply-button {
            animation: comment-reply-button 0.5s;
            animation-fill-mode: forwards;
          }
        }
      }

      .c-input {
        .send-button {
          padding-left: 12px;
          padding-right: 12px;
        }
      }
    }
  }

  @keyframes comment-name {
    0% {
      width: 0;
      opacity: 0;
      height: 0;
    }
    100% {
      opacity: 1;
      width: initial;
      height: initial;
      overflow: visible;
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
