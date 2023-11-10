<template>
  <div class="user-space">
    <img class="avatar" :src="store.avatar" />
    <div class="entrance-wrapper">
      <div class="entrance" data-name="新建相册" @click="store.openEdit()">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M512 62c-248.4 0-450 201.6-450 450s201.6 450 450 450 450-201.6 450-450-201.6-450-450-450zM725.282 544.733h-172.602v172.611c0 20.753-17.487 38.232-38.242 38.232-20.753 0-38.232-17.478-38.232-38.232v-172.611h-172.62c-20.745 0-38.232-17.478-38.232-38.232 0-20.764 17.487-38.242 38.242-38.242h172.611v-172.611c0-20.753 17.478-38.232 38.232-38.232s38.242 17.478 38.242 38.232v172.62h172.602c20.764 0 38.242 17.469 38.242 38.232 0 21.843-17.478 38.232-38.242 38.232z"
          ></path>
        </svg>
      </div>
      <div class="entrance" data-name="我的相册" @click="onenAlbumDialog('my')">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M853.333333 85.333333H256c-51.456 0-128 34.090667-128 128v597.333334c0 93.909333 76.544 128 128 128h640v-85.333334H256.512C236.8 852.821333 213.333333 845.056 213.333333 810.666667s23.466667-42.154667 43.178667-42.666667H896V128a42.666667 42.666667 0 0 0-42.666667-42.666667zM405.461333 213.333333a64.128 64.128 0 1 1 0 128.256 64.128 64.128 0 0 1 0-128.256zM512 554.666667H298.666667l128-128 64 59.690666L618.666667 341.333333l149.333333 213.333334h-256z"
          ></path>
        </svg>
      </div>
      <div class="entrance" data-name="我的喜欢" @click="onenAlbumDialog('like')">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M512 901.746939c-13.583673 0-26.122449-4.179592-37.093878-13.061225-8.881633-7.314286-225.697959-175.020408-312.424489-311.379592C133.746939 532.37551 94.040816 471.24898 94.040816 384.522449c0-144.718367 108.146939-262.269388 240.326531-262.269388 67.395918 0 131.657143 30.82449 177.632653 84.636735 45.453061-54.334694 109.191837-84.636735 177.110204-84.636735 132.702041 0 240.326531 117.55102 240.326531 262.269388 0 85.159184-37.093878 143.673469-67.395919 191.216327l-1.044898 1.567346c-86.726531 136.359184-303.542857 304.587755-312.424489 311.379592-10.44898 8.359184-22.987755 13.061224-36.571429 13.061225z"
          ></path>
        </svg>
      </div>
      <div class="entrance" data-name="我的消息">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M799.9 681.3c7-0.2 14 1.2 20.7 5.6-24.3-15.6-40.3-42.8-40.3-73.9V439.5c0-127.1-91.9-233.2-214.7-259.3V174c0-32.4-26.2-58.5-58.5-58.5s-58.5 26.2-58.5 58.5v6.2c-122.8 26.1-214.7 132.1-214.7 259.3V613c0 31.1-16.1 58.3-40.3 73.9 6.8-4.4 13.7-5.9 20.7-5.6-21.5 0.1-38.9 17.4-38.9 39s17.4 39 39 39h585.3c21.6 0 39-17.4 39-39 0.1-21.4-17.3-38.9-38.8-39zM507.2 896c53.9 0 97.6-43.7 97.6-97.6H409.6c0 53.9 43.6 97.6 97.6 97.6z"
          ></path>
        </svg>
      </div>
      <div class="entrance" data-name="退出登录">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M863.4 493.3L744.2 344.2c-5.8-7.2-14.4-11.2-23.3-11.2-3.3 0-6.6 0.5-9.9 1.7-11.9 4.2-19.9 15.5-19.9 28.1v89.5H452.5c-32.9 0-59.6 26.7-59.6 59.6 0 32.9 26.7 59.6 59.6 59.6H691V661c0 12.7 8 23.9 19.9 28.1 3.2 1.1 6.6 1.7 9.9 1.7 8.9 0 17.5-4 23.3-11.2l119.3-149.1c8.8-10.8 8.8-26.3 0-37.2zM571.8 750.5H332.7c-32.7 0-59.2-26.7-59.2-59.6V333v-0.5c0-32.7 26.7-59.2 59.7-59.2h238.5c32.9 0 59.6-26.7 59.6-59.6 0-32.9-26.7-59.6-59.6-59.6H273.6c-65.9 0-119.3 53.4-119.3 119.3v477.1c0 65.9 53.4 119.3 119.3 119.3h298.2c32.9 0 59.6-26.7 59.6-59.6 0-33-26.7-59.7-59.6-59.7z m0 0"
          ></path>
        </svg>
      </div>
    </div>
    <!-- 相册列表 -->
    <x-dialog v-model:visible="albumVisible">
      <album-dialog :type="albumType"></album-dialog>
    </x-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import XDialog from '@/common/x-dialog.vue';
  import AlbumDialog from './album-dialog.vue';
  import useStore from '@/store/app';

  const store = useStore();

  // 我的相册 我的喜欢
  const albumVisible = ref(false);
  const albumType = ref('my'); // my|like

  const onenAlbumDialog = (type: string) => {
    albumType.value = type;
    albumVisible.value = true;
  };
</script>

<style lang="scss" scoped>
  .icon {
    width: 20px;
    height: 20px;
  }

  .user-space {
    position: relative;

    .avatar {
      width: 40px;
      height: 40px;
      background-color: aqua;
      border-radius: 100%;
      cursor: pointer;
    }

    .entrance-wrapper {
      position: absolute;
      top: 100%;
      left: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 10px;
      transform: translateY(0) translateX(-50%);
      transition: opacity 0.3s, transform 0.3s;
      pointer-events: none;

      .entrance {
        position: relative;
        width: 40px;
        padding: 4px 0;
        text-align: center;
        transform: translateX(10px);
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s;
        fill: #fff;

        &:nth-of-type(2) {
          transition-delay: 0.05s;
        }

        &:nth-of-type(3) {
          transition-delay: 0.1s;
        }

        &:nth-of-type(4) {
          transition-delay: 0.15s;
        }

        &:nth-of-type(5) {
          transition-delay: 0.2s;
        }

        &::before {
          position: absolute;
          top: 50%;
          left: -4px;
          width: 60px;
          padding: 2px 6px;
          font-size: 12px;
          background-color: rgb(99 99 99 / 50%);
          border-radius: 8px;
          transform: translate(-80%, -50%);
          opacity: 0;
          transition: all 0.3s;
          content: attr(data-name);
        }

        &:hover {
          color: #ddd;

          &::before {
            transform: translate(-100%, -50%);
            opacity: 1;
          }
        }

        &:nth-of-type(1):hover {
          fill: #eee;
        }

        &:nth-of-type(2):hover {
          fill: #00bcd4;
        }

        &:nth-of-type(3):hover {
          fill: #e5404f;
        }

        &:nth-of-type(4):hover {
          fill: #ff9800;
        }

        &:nth-of-type(5):hover {
          fill: #666;
        }
      }

      &:hover {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
        pointer-events: initial;
      }
    }

    .entrance-show {
      transform: translateY(0) translateX(-50%);
      opacity: 1;
      pointer-events: initial;
    }

    &:hover {
      .entrance-wrapper {
        pointer-events: initial;

        /* stylelint-disable-next-line no-descending-specificity */
        .entrance {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
  }
</style>
