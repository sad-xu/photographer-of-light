<template>
  <div class="setting-part-wrapper">
    <div class="setting-part">
      <!-- 缩放 -->
      <div class="setting">
        <div data-name="缩放" class="setting-icon">
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M609.52 584.92a35.309 35.309 0 0 1 24.98-10.36c9.37 0 18.36 3.73 24.98 10.36l189.29 189.22-0.07-114.3 0.57-6.35c3.25-17.98 19.7-30.5 37.9-28.85 18.2 1.65 32.12 16.92 32.09 35.2v200.23c-0.05 1.49-0.19 2.97-0.42 4.45l-0.21 1.13c-0.22 1.44-0.55 2.85-0.99 4.24l-0.57 1.62-0.56 1.41a34.163 34.163 0 0 1-7.62 11.36l2.12-2.4-0.14 0.14-0.92 1.06-1.06 1.2-0.57 0.57-0.56 0.57a36.378 36.378 0 0 1-16.23 8.39l-3.53 0.5-4.02 0.35h-199.6l-6.35-0.63c-16.73-3.06-28.9-17.63-28.93-34.64l0.56-6.35c3.07-16.76 17.67-28.93 34.71-28.92l114.29-0.14-189.07-189.1-4.09-4.94c-9.71-14.01-8.01-32.95 4.02-45.02z m-162.06 0c12.06 12.05 13.78 30.99 4.09 45.01l-4.09 4.94-189.15 189.08 114.3 0.14c17.04-0.01 31.65 12.17 34.71 28.92l0.57 6.35c-0.03 17.01-12.19 31.58-28.92 34.64l-6.35 0.63H173.09l-4.23-0.42-3.39-0.49a36.38 36.38 0 0 1-17.36-9.52l-1.06-1.13-0.98-1.13 0.98 1.06-1.97-2.26 0.85 1.06-0.42-0.56a35.137 35.137 0 0 1-3.74-5.64l-1.13-2.68a34.71 34.71 0 0 1-2.11-7.33l-0.28-1.13c-0.21-1.47-0.33-2.96-0.36-4.45V659.78c-0.03-18.28 13.89-33.55 32.09-35.2 18.2-1.65 34.65 10.87 37.9 28.85l0.57 6.35-0.07 114.36 189.29-189.22c13.77-13.77 36.11-13.77 49.88 0h-0.09z m-74.71-471.71l6.35 0.57c16.76 3.06 28.93 17.67 28.92 34.71l-0.63 6.35c-3.07 16.76-17.67 28.93-34.71 28.92l-114.3 0.14 189.15 189.08 4.09 4.94c10.26 15.02 7.42 35.37-6.55 47.01-13.98 11.63-34.51 10.74-47.42-2.07L208.29 233.71l0.07 114.3-0.57 6.35c-3.25 17.98-19.7 30.5-37.9 28.85-18.2-1.65-32.12-16.92-32.09-35.2V147.78c0-1.55 0.14-3.03 0.35-4.51l0.21-1.13c0.24-1.44 0.59-2.85 1.06-4.23a34.97 34.97 0 0 1 8.68-14.39l-2.12 2.4-0.42 0.57 1.55-1.84-0.99 1.06 0.92-0.98 2.26-2.33c3.04-2.73 6.52-4.92 10.3-6.49l2.82-1.06c3.45-1.07 7.04-1.62 10.65-1.62l-3.6 0.14h0.49l1.48-0.14h201.31z m512.91 0l1.41 0.14h0.42c2.43 0.29 4.84 0.79 7.19 1.48l2.82 1.06 2.61 1.2 3.04 1.76c2.09 1.33 4.03 2.89 5.78 4.66l1.13 1.2 0.78 0.98 0.21 0.14 0.49 0.64 2.33 3.17c2.35 3.83 3.98 8.07 4.8 12.49l0.21 1.13c0.21 1.48 0.35 2.96 0.35 4.44v200.37c-0.16 18.13-14.03 33.19-32.08 34.83-18.06 1.64-34.42-10.67-37.83-28.48l-0.57-6.35V233.65L659.54 422.87c-12.9 12.95-33.56 13.91-47.59 2.2-14.04-11.71-16.81-32.2-6.38-47.22l4.02-4.86 189.22-189.08-114.29-0.14c-17.06 0.04-31.71-12.14-34.78-28.92l-0.63-6.35c-0.01-17.04 12.16-31.65 28.93-34.71l6.35-0.57h201.27z m0 0"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <div class="setting-content">
          <svg
            class="icon scale-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            @click="emits('setting-change', 'scale', -0.1)"
          >
            <path
              d="M512 853.333333c-187.733333 0-341.333333-153.6-341.333333-341.333333s153.6-341.333333 341.333333-341.333333 341.333333 153.6 341.333333 341.333333-153.6 341.333333-341.333333 341.333333z m0-85.333333c140.8 0 256-115.2 256-256s-115.2-256-256-256-256 115.2-256 256 115.2 256 256 256z m-170.666667-298.666667h341.333334v85.333334H341.333333v-85.333334z"
            ></path>
          </svg>
          <span class="scale-num">{{ props.setting.scale.toFixed(1) }}</span>
          <svg
            class="icon scale-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            @click="emits('setting-change', 'scale', 0.1)"
          >
            <path
              d="M469.333333 469.333333V341.333333h85.333334v128h128v85.333334h-128v128h-85.333334v-128H341.333333v-85.333334h128z m42.666667 384c-187.733333 0-341.333333-153.6-341.333333-341.333333s153.6-341.333333 341.333333-341.333333 341.333333 153.6 341.333333 341.333333-153.6 341.333333-341.333333 341.333333z m0-85.333333c140.8 0 256-115.2 256-256s-115.2-256-256-256-256 115.2-256 256 115.2 256 256 256z"
            ></path>
          </svg>
        </div>
      </div>
      <!-- shine -->
      <div class="setting">
        <div class="setting-icon shine-icon" data-name="炫光"></div>
        <div class="setting-content">
          <div class="dot-wrapper">
            <div
              v-for="s in shineList"
              :key="s"
              class="dot"
              :class="props.setting.shine === s ? 'selected-dot' : ''"
              @click="emits('setting-change', 'shine', s)"
            ></div>
          </div>
        </div>
      </div>
      <!-- glare -->
      <div class="setting">
        <div class="setting-icon glare-icon" data-name="光晕"></div>
        <div class="setting-content">
          <div class="dot-wrapper">
            <div
              v-for="g in glareList"
              :key="g"
              class="dot"
              :class="props.setting.glare === g ? 'selected-dot' : ''"
              @click="emits('setting-change', 'glare', g)"
            ></div>
          </div>
        </div>
      </div>
      <!-- 喜欢 -->
      <!-- <div class="setting">
        <div data-name="喜欢" class="setting-icon">
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M515.2 67.2c-246.4 0-448 201.6-448 448s201.6 448 448 448 448-201.6 448-448-201.6-448-448-448zM704 563.2l-150.4 153.6c-12.8 12.8-25.6 19.2-41.6 19.2s-28.8-6.4-41.6-19.2l-147.2-153.6C307.2 544 288 515.2 288 476.8c0-67.2 54.4-121.6 118.4-121.6 32 0 60.8 12.8 83.2 35.2l22.4 22.4c9.6-9.6 19.2-22.4 22.4-22.4 22.4-22.4 51.2-35.2 83.2-35.2 67.2 0 118.4 54.4 118.4 121.6 3.2 41.6-12.8 64-32 86.4z"
              :fill="props.isLike ? '#F06292' : '#fff'"
            ></path>
          </svg>
        </div>
        <div class="setting-content">
          <svg
            class="icon heart-icon"
            :class="props.isLike ? 'like-icon' : ''"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            @click="emits('toggleLike')"
          >
            <path
              d="M512 901.746939c-13.583673 0-26.122449-4.179592-37.093878-13.061225-8.881633-7.314286-225.697959-175.020408-312.424489-311.379592C133.746939 532.37551 94.040816 471.24898 94.040816 384.522449c0-144.718367 108.146939-262.269388 240.326531-262.269388 67.395918 0 131.657143 30.82449 177.632653 84.636735 45.453061-54.334694 109.191837-84.636735 177.110204-84.636735 132.702041 0 240.326531 117.55102 240.326531 262.269388 0 85.159184-37.093878 143.673469-67.395919 191.216327l-1.044898 1.567346c-86.726531 136.359184-303.542857 304.587755-312.424489 311.379592-10.44898 8.359184-22.987755 13.061224-36.571429 13.061225z"
            ></path>
          </svg>
        </div>
      </div> -->
      <!-- 编辑 -->
      <!-- <div class="setting">
        <div data-name="编辑" class="setting-icon">
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M892 855.7H132a4 4 0 0 0-4 4v64a4 4 0 0 0 4 4h760a4 4 0 0 0 4-4v-64a4 4 0 0 0-4-4z m-678-71.6L419.2 749a69.7 69.7 0 0 0 37.3-19.3l252.8-252.9a4 4 0 0 0 0-5.7L503.9 265.7a4 4 0 0 0-5.7 0L245.3 518.5a69.7 69.7 0 0 0-19.3 37.3L190.9 761a20 20 0 0 0 23.1 23.1z m547.7-365.3a3.9 3.9 0 0 0 5.6 0l91.1-91.1a68.6 68.6 0 0 0 0.3-97.1L744.4 116.3c-26.7-26.8-70.2-26.6-97.1 0.3l-91.1 91.1a3.9 3.9 0 0 0 0 5.6z"
              fill="#fff"
            ></path>
          </svg>
        </div>
        <div class="setting-content">
          <span class="edit-text" @click="emits('onEdit')">编辑</span>
        </div>
      </div> -->
      <!-- 原图 -->
      <div class="setting">
        <div data-name="原图" class="setting-icon">
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M895.5 831.7H128c-35.1 0-63.8 28.7-63.8 63.8 0 35.1 28.7 63.8 63.8 63.8h767.5c35.1 0 63.8-28.7 63.8-63.8 0-35.1-28.7-63.8-63.8-63.8zM811 383H672.2V123.8c0-33.3-27-60.4-60.4-60.4H412.4c-33.3 0-60.4 27-60.4 60.4V383H213.2c-26.7 0-40.7 31.8-22.5 51.5L489.6 758c12.1 13.1 32.9 13.1 45.1 0l298.8-323.5c18.1-19.7 4.2-51.5-22.5-51.5z"
              fill="#fff"
            ></path>
          </svg>
        </div>
        <div class="setting-content">
          <a class="link" :href="props.imgUrl" target="_blank"> 原图 </a>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="setting-footer">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { CardSetting } from './index.vue';

  const props = defineProps<{
    // albumId: string;
    setting: CardSetting;
    // 图片链接
    imgUrl: string;
    // isLike: boolean;
  }>();

  const emits = defineEmits<{
    // 打开编辑
    (e: 'onEdit'): void;
    // 切换喜欢
    (e: 'toggleLike'): void;
    // 更新设置
    (e: 'setting-change', name: 'scale' | 'shine' | 'glare', val: number | string): void;
  }>();

  // 炫光选项
  const shineList = ref([
    's-0',
    's-1',
    's-2',
    's-3',
    's-4',
    's-5',
    's-6',
    's-7',
    's-8',
    's-9',
    's-10',
    's-11',
    's-12',
    's-13',
  ]);

  // 光晕选项
  const glareList = ref([
    'g-0',
    'g-1',
    'g-2',
    'g-3',
    'g-4',
    'g-5',
    'g-6',
    'g-7',
    'g-8',
    'g-9',
    'g-10',
    'g-11',
    'g-12',
    'g-13',
    'g-14',
  ]);
</script>

<style lang="scss" scoped>
  .setting-part-wrapper {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translate(72px, -50%);
  }

  .setting-footer {
    position: absolute;
    right: 0;
    bottom: -12px;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30px;
    transform: translateY(100%);
  }

  .setting-part {
    display: flex;
    flex-direction: column;
    width: 102px;
    padding: 8px 0 8px 4px;
    font-size: 14px;
    background: #0202022e;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0 0 15px 0 #020202;
    opacity: 0.3;
    transition: all 0.3s;
    user-select: none;

    &:hover {
      // padding: 12px 0 12px 4px;
      transform: translate(-72px);
      opacity: 1;
    }

    .setting {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 3px 0;

      .icon {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        transition: all 0.15s;
      }

      .scale-icon {
        cursor: pointer;
        fill: #fff;

        &:hover {
          fill: #2196f3;
        }
      }

      .setting-icon {
        position: relative;
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        transition: opacity 0.15s;

        &::before {
          position: absolute;
          top: 50%;
          left: -4px;
          width: 40px;
          padding: 2px 6px;
          font-size: 12px;
          text-align: center;
          background-color: rgb(99 99 99 / 50%);
          border-radius: 8px;
          transform: translate(-100%, -50%);
          opacity: 0;
          transition: all 0.3s;
          content: attr(data-name);
          pointer-events: none;
        }

        &:hover {
          opacity: 0.8;

          &::before {
            transform: translate(-120%, -50%);
            opacity: 1;
          }
        }
      }

      .setting-content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 72px;

        .scale-num {
          min-width: 20px;
          font-size: 13px;
          text-align: center;
        }

        .heart-icon {
          cursor: pointer;
          transition: all 0.15s;
          fill: #eee;

          &:hover {
            transform: scale(1.2);
          }
        }

        .like-icon {
          fill: #e91e63;
        }

        .edit-text {
          color: #607d8b;
          cursor: pointer;

          &:hover {
            color: #1e88e5;
          }
        }

        .link {
          color: #607d8b;

          &:hover {
            color: #f44336;
          }
        }
      }
    }
  }

  .shine-icon {
    background: url('@/assets/shine-icon.png') center / cover no-repeat;
  }

  .glare-icon {
    background: url('@/assets/glare-icon.png') center / cover no-repeat;
  }

  .dot-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .dot {
      width: 6px;
      height: 6px;
      margin: 3px 6px;
      background-color: #fff;
      border-radius: 100%;
      cursor: pointer;

      &:hover {
        background-color: #f5a49e;
      }
    }

    .selected-dot {
      background-color: #f44336;
    }
  }
</style>
