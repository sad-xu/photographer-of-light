<template>
  <div class="msg-content">
    <div v-for="item in msgList" class="msg" :key="item._id">
      <div class="time">{{ formatDate(item.t) }}</div>
      <div class="content">
        <span class="replier">{{ item.replierName }}</span>
        <template v-if="item.replyId">
          在<span class="album" @click="handleSelectAlbum(item)">【{{ item.albumName }}】</span
          >回复了你：
        </template>
        <template v-else>
          评论了<span class="album" @click="handleSelectAlbum(item)">【{{ item.albumName }}】</span
          >：
        </template>
        <span class="text">{{ item.content }}</span>
      </div>
    </div>
    <div v-if="loading" class="loading">loading...</div>
    <div class="more" v-if="showMore && !loading">
      <span class="more-text" @click="getMsgList">查看更多</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // @ts-nocheck
  import { mockRequest } from '@/api/album';
  import { onMounted, ref } from 'vue';
  import { Comment } from '@/api/types';
  import { formatDate } from '@/utils';

  const emits = defineEmits<{
    // 选中评论所在的相册
    (e: 'select', albumId: string): void;
  }>();

  const loading = ref(false);
  const showMore = ref(false);
  const msgList = ref<Comment[]>([]);

  onMounted(() => {
    getMsgList();
  });

  const getMsgList = () => {
    loading.value = true;
    mockRequest('')
      .then((res) => {
        msgList.value = msgList.value.concat(
          Array.from({ length: 20 }).map((_, i) => ({
            _id: 'id' + i,
            albumId: '1',
            albumName: 'album name',
            albumAuthorId: 'a1',
            replierId: 'o1',
            replierName: '回复人1',
            replyId: Math.random() > 0.5 ? 'id4' : '',
            avatar:
              'https://p9-passport.byteacctimg.com/img/user-avatar/dd0631bfdae04026ee702667b004027d~50x50.awebp',
            content: '好看好看！',
            t: 1699322089,
          }))
        );
        showMore.value = true;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const handleSelectAlbum = (item: Comment) => {
    emits('select', item.albumId);
  };
</script>

<style lang="scss" scoped>
  .msg-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 30vw;
    min-width: 400px;
    padding: 16px;
    overflow-y: auto;
    color: #e9e9e9;
    background-color: #3339;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 0;
    }
  }

  .msg {
    padding-bottom: 8px;

    .time {
      padding: 8px 0;
      color: #ddd;
      font-size: 14px;
    }

    .content {
      font-size: 15px;
      line-height: 24px;
      word-break: break-all;

      .replier {
        color: #4fc3f7;
      }

      .album {
        color: #2196f3;
        cursor: pointer;
      }

      .text {
        color: #fff;
      }
    }
  }

  .more {
    padding: 12px 0;
    text-align: center;

    .more-text {
      color: #bbb;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.15s;

      &:hover {
        color: #03a9f4;
      }
    }
  }

  @include media-breakpoint-down(md) {
    .msg-content {
      min-width: 80vw;
    }
  }
</style>
