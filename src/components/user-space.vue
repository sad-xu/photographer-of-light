<template>
  <div class="user-space">
    <div class="avatar" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"></div>
    <div
      class="entrance"
      :class="showEntrance ? 'entrance-show' : ''"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div @click="createVisible = true">新建</div>
      <div
        @click="
          albumType = 'my';
          albumVisible = true;
        "
      >
        相册
      </div>
      <div
        @click="
          albumType = 'like';
          albumVisible = true;
        "
      >
        喜欢
      </div>
      <div>消息</div>
      <div>退出</div>
    </div>
    <!--  -->
    <x-dialog v-model:visible="createVisible">
      <create-dialog></create-dialog>
    </x-dialog>
    <!--  -->
    <x-dialog v-model:visible="albumVisible">
      <album-dialog :type="albumType"></album-dialog>
    </x-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import XDialog from '../common/x-dialog.vue';
  import CreateDialog from './create-dialog.vue';
  import AlbumDialog from './album-dialog.vue';

  // popover
  const showEntrance = ref(false);

  let t = 0;
  const handleMouseEnter = () => {
    window.clearTimeout(t);
    showEntrance.value = true;
  };

  const handleMouseLeave = () => {
    t = window.setTimeout(() => {
      showEntrance.value = false;
    }, 300);
  };

  // create
  const createVisible = ref(false);

  // 我的相册 我的喜欢
  const albumVisible = ref(false);
  const albumType = ref('my'); // my|like
</script>

<style lang="scss" scoped>
  .user-space {
    position: relative;

    .avatar {
      width: 40px;
      height: 40px;
      background-color: aqua;
      border-radius: 100%;
      cursor: pointer;
    }

    .entrance {
      position: absolute;
      top: 110%;
      left: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 10px;
      transform: translateY(-10px) translateX(-50%);
      opacity: 0;
      transition: opacity 0.3s, transform 0.3s;
      pointer-events: none;

      > div {
        width: 80px;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: aquamarine;
        }
      }
    }

    .entrance-show {
      transform: translateY(0) translateX(-50%);
      opacity: 1;
      pointer-events: initial;
    }
  }
</style>
