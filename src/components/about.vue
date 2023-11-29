<template>
  <div v-if="props.type === 'about'" class="about-content">
    <h1>光之摄影师</h1>
    <p class="desc">-- 专为 FF14 打造的照片分享网站</p>
    <div class="contributor-wrapper">
      <div class="contributor">
        <span>作者:</span>
        <img
          class="avatar"
          alt="author"
          src="https://i1.hdslb.com/bfs/face/bf80ff5f3ce928757f766057fbde3d723e88f0ac.jpg@96w_96h"
        />
        <span style="color: #00bcd4">妙蛤种子@琥珀原</span>
      </div>
    </div>
  </div>
  <div v-else-if="props.type === 'update'" class="update-content">
    <h2>更新日志</h2>
    <p class="line">开发中...</p>
  </div>
</template>

<script lang="ts" setup>
  export type AboutType = 'about' | 'update';

  const props = defineProps<{
    type: AboutType;
  }>();
</script>

<style lang="scss" scoped>
  .about-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .desc {
      margin-top: 12px;
      font-size: 18px;
      transform: translateX(50%);
    }

    .contributor-wrapper {
      padding-top: 48px;

      .contributor {
        display: flex;
        align-items: center;
        font-size: 15px;

        .avatar {
          width: 24px;
          height: 24px;
          margin-right: 8px;
          margin-left: 12px;
          border-radius: 100%;
        }
      }
    }
  }

  .update-content {
    h2 {
      margin-bottom: 24px;
    }
  }
</style>
