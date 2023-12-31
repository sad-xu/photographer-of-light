<template>
  <div class="header">
    <div class="title-wrapper">
      <h3>{{ props.name }}</h3>
      <span class="sub-title">{{ props.subName }}</span>
    </div>
    <slot></slot>
  </div>
  <div class="board-list">
    <Transition name="board" mode="out-in">
      <div :key="props.albumList.length ? props.albumList[0].id : 1" class="scroll-container">
        <div
          v-for="(album, i) in props.albumList"
          :key="album.id"
          class="album"
          :style="{ 'transition-delay': `${i * 0.05}s` }"
        >
          <div class="album-header">
            <span class="name" @click="jumpToDetail(album.id)">{{ album.name }}</span>
            <div class="icon-wrapper" v-if="props.type === 'likest'">
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M512 901.746939c-13.583673 0-26.122449-4.179592-37.093878-13.061225-8.881633-7.314286-225.697959-175.020408-312.424489-311.379592C133.746939 532.37551 94.040816 471.24898 94.040816 384.522449c0-144.718367 108.146939-262.269388 240.326531-262.269388 67.395918 0 131.657143 30.82449 177.632653 84.636735 45.453061-54.334694 109.191837-84.636735 177.110204-84.636735 132.702041 0 240.326531 117.55102 240.326531 262.269388 0 85.159184-37.093878 143.673469-67.395919 191.216327l-1.044898 1.567346c-86.726531 136.359184-303.542857 304.587755-312.424489 311.379592-10.44898 8.359184-22.987755 13.061224-36.571429 13.061225z"
                  fill="#E5404F"
                ></path>
              </svg>
              <span>{{ album.star }}</span>
            </div>
            <div class="icon-wrapper" v-if="props.type === 'commentest'">
              <svg
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M512 67C266.24 67 67 241.33 67 456.37c0 122.9 65.23 232.32 166.87 303.69V957l195-118.3a508.35 508.35 0 0 0 83.17 7c245.77 0 445-174.32 445-389.37S757.77 67 512 67zM289.5 512a55.62 55.62 0 1 1 55.62-55.62A55.62 55.62 0 0 1 289.5 512z m222.5 0a55.62 55.62 0 1 1 55.62-55.62A55.62 55.62 0 0 1 512 512z m222.5 0a55.62 55.62 0 1 1 55.62-55.62A55.62 55.62 0 0 1 734.5 512z"
                  fill="#ddd"
                ></path>
              </svg>
              <span>{{ album.commentNum }}</span>
            </div>
            <div class="time" v-if="props.type === 'latest'">
              {{ formatDate(album.updateTime) }}
            </div>
          </div>
          <div class="desc" @click="jumpToDetail(album.id)">
            {{ album.desc }}
          </div>
          <div class="album-footer">
            <span class="user-name" @click="openTargetUser(album.userId, album.userName)">
              {{ album.userName }}
            </span>
            <thumbnails-group
              :photoNum="album.photoNum"
              :thumbnails="album.thumbnails"
            ></thumbnails-group>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
  import { formatDate } from '@/utils';
  import ThumbnailsGroup from './thumbnails-group.vue';
  import useStore from '@/store/app';

  const props = defineProps<{
    name: string;
    subName: string;
    albumList: any[];
    type: string;
  }>();

  const store = useStore();

  /** 打开详情 */
  const jumpToDetail = (id: string) => {
    store.setDetailId(id);
  };

  /** 打开指定用户相册列表 */
  const openTargetUser = (userId: string, userName: string) => {
    store.openTargetUser(userId, userName);
  };
</script>

<style lang="scss" scoped>
  .board-enter-active,
  .board-leave-active {
    transition: all 0.3s ease-out;
  }

  .board-enter-from {
    transform: translateY(-30px);
    opacity: 0;
  }

  .board-leave-to {
    transform: translateY(30px);
    opacity: 0;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;

    .title-wrapper {
      display: flex;
      align-items: flex-end;

      h3 {
        flex-shrink: 0;
        margin-right: 12px;
      }

      .sub-title {
        font-family: EORZEA, sans-serif;
      }
    }
  }

  .board-list {
    position: relative;
    flex: 1;
    height: calc(100% - 32px);

    .scroll-container {
      height: 100%;
      overflow: hidden auto;

      .album {
        position: relative;
        padding: 8px 4px 8px 0;
        border-bottom: 1px solid rgb(153 153 153 / 80%);

        .album-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
          padding-right: 4px;
          line-height: 24px;

          .name {
            font-size: 18px;
            word-break: break-all;
            cursor: pointer;
            transition: color 0.15s;

            &:hover {
              color: #03a9f4;
            }
          }

          .icon-wrapper {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: flex-end;
            min-width: 46px;
            margin-left: 12px;
            font-size: 14px;

            .icon {
              width: 16px;
              height: 16px;
              margin-right: 4px;
            }
          }

          .time {
            font-size: 14px;
          }
        }

        .desc {
          display: -webkit-box;
          overflow: hidden;
          color: #ddd;
          font-size: 14px;
          text-overflow: ellipsis;
          word-break: break-all;
          cursor: pointer;
          transition: color 0.15s;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;

          // white-space: nowrap;

          &:hover {
            color: #03a9f4;
          }
        }

        .album-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 22px;
          margin-top: 4px;
          font-size: 13px;

          .user-name {
            cursor: pointer;

            &:hover {
              color: #03a9f4;
            }
          }
        }
      }
    }
  }
</style>
