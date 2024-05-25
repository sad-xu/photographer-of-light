<template>
  <div class="home">
    <Transition name="fade">
      <video
        id="BgVideo"
        :key="bgUrl"
        class="bg-video"
        autoPlay
        loop
        muted
        playsinline
        webkit-playsinline
        :src="bgUrl"
      ></video>
    </Transition>
    <Transition name="fade" appear>
      <div class="title-wrapper" :class="{ 'title-wrapper-show': showInput }">
        <h1 class="title">光之摄影师</h1>
        <h3 class="sub-title">Photagrapher Of Light</h3>
      </div>
    </Transition>
    <Transition name="fade">
      <div class="input-wrapper" :class="{ 'input-wrapper-show': showInput }">
        <input
          class="input-box"
          v-show="showInput"
          v-model.trim="kw"
          placeholder="请输入相册ID"
          @keyup.enter="jumpToDetail"
        />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { BG_VIDEO_LIST } from '@/utils';

  const bgUrl = ref(BG_VIDEO_LIST[Math.floor(Math.random() * BG_VIDEO_LIST.length)].url);
  const showInput = ref(false);
  const kw = ref('');

  onMounted(() => {
    document.addEventListener('WeixinJSBridgeReady', () => {
      (document.getElementById('BgVideo') as any).play();
    });
    window.setTimeout(() => {
      showInput.value = true;
    }, 300);
  });

  const jumpToDetail = () => {
    if (kw.value) {
      window.location.href = window.location.origin + window.location.pathname + `?id=${kw.value}`;
    }
  };
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .bg-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 1.5s;
    pointer-events: none;
  }

  .title-wrapper {
    position: absolute;
    top: 50vh;
    left: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    transform: translateY(-100%);
    mix-blend-mode: difference;
    transition: all 1s;

    .title {
      color: #fff;
      font-size: 45px;
      font-family: cursive;
      transform: scale(1.5);
      transition: all 1s;
    }

    .sub-title {
      margin-top: 15px;
      color: #fff;
      font-size: 18px;
      font-family: EORZEA, sans-serif;
      transform: scale(1.5);
      transition: all 1s;
    }
  }

  .title-wrapper-show {
    top: 25vh;

    .title,
    .sub-title {
      transform: scale(1.4);
    }
  }

  .input-wrapper {
    position: absolute;
    top: 40vh;
    right: 0;
    left: 0;
    text-align: center;
    opacity: 0;
    transition: opacity 1s;

    .input-box {
      width: 25vw;
      min-width: 200px;
      height: 50px;
      padding: 8px 12px;
      color: #eee;
      font-size: 24px;
      text-align: center;
      background: #45454599;
      border: 1px solid #5d5d5d;
      border-radius: 50px;
      box-shadow: inset 0 0 4px #333;
      transition: all 0.3s;

      &:focus {
        border-color: #607d8b;
        box-shadow: inset 0 0 4px #607d8b;
      }

      &::placeholder {
        color: #999;
        font-size: 20px;
        font-style: italic;
      }
    }
  }

  .input-wrapper-show {
    opacity: 1;
  }
</style>
