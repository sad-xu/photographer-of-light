<template>
  <div class="comment-part">
    <div class="c-content">
      <div class="comment" v-for="i in 40" :key="i">
        <span class="name">xxx:</span>
        <span>content content content</span>
      </div>
    </div>
    <div class="c-input">
      <input />
      <span class="send-button">send</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const commentList = ref([]);
</script>

<style lang="scss" scoped>
  .comment-part {
    display: flex;
    flex-direction: column;
    width: 150px;
    opacity: 0.3;
    transition: all 0.3s;

    .c-content {
      flex-grow: 1;
      height: 100%;
      overflow: auto;
      word-break: break-all;

      .comment {
        padding: 8px 4px;

        .name {
          display: none;
        }
      }
    }

    .c-input {
      display: flex;
      flex-shrink: 0;
      height: 30px;
      background-color: red;

      input {
        width: 100%;
      }

      .send-button {
        cursor: pointer;
      }
    }

    &:hover {
      z-index: 3;
      width: 220px;
      opacity: 1;

      .c-content {
        .comment {
          .name {
            display: inline-block;
          }
        }
      }
    }
  }
</style>
