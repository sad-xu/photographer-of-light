<template>
  <div v-if="props.type === 'about'" class="about-content">
    <h1>光之摄影师</h1>
    <p class="desc">专为 FF14 打造的照片分享网站</p>
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
    <h2 class="title">更新日志</h2>
    <p class="line">开发中...</p>
  </div>
  <div v-else-if="props.type === 'guide'" class="guide-content">
    <!-- <h2 class="title">使用说明</h2> -->
    <h2 id="-">简介</h2>
    <p>【光之摄影师】一个专为FF14打造的照片分享网站</p>
    <p><a href="https://fffff.games/p">https://fffff.games/p</a> 路径名待确定？</p>
    <h2 id="-">特色</h2>
    <ul>
      <li><p>FF14 only</p></li>
      <li><p>由于主要功能是照片展示，视觉效果和交互需要有特色</p></li>
    </ul>
    <p>渐变、模糊、动画、滤镜、噪点、音效、切换过渡效果、等微交互</p>
    <h2 id="-">主要页面</h2>
    <p>所有功能集合到一个页面，不分其他路由</p>
    <p>原型</p>
    <ul>
      <li>首页-照片展示页</li>
    </ul>
    <p>查看当前相册的照片，切换</p>
    <p>搜索相册</p>
    <p>点赞相册-仅登录</p>
    <p>查看、写、删除留言</p>
    <ul>
      <li>个人中心</li>
    </ul>
    <p>查看、管理用户已上传的相册</p>
    <p>查看收藏的相册</p>
    <p>新建相册</p>
    <p>编辑自己的相册详情 - 同新建</p>
    <p>查看、回复留言</p>
    <p>QQ互联登录、退出</p>
    <h2 id="-">主要功能</h2>
    <ul>
      <li><p>照片查看效果 3D悬浮+闪光 可配置，配置记录在本地</p></li>
      <li><p>照片查看支持滚轮缩放</p></li>
      <li><p>鼠标位置移动时的位移效果</p></li>
      <li><p>照片切换时的效果 模糊过渡+滤镜</p></li>
      <li><p>相册搜索 内置过滤tag</p></li>
      <li><p>QQ登录+用户信息，共用光之演奏家的</p></li>
      <li><p>分享 QQ+微信+B站</p></li>
      <li><p>移动端适配</p></li>
      <li><p>音效 使用FF14内置音效 新留言提示用邮箱音效</p></li>
      <li><p>图片上传 原图上传，超过5m给压缩提示？</p></li>
      <li><p>对相册的留言功能</p></li>
      <li><p>接入百度统计</p></li>
      <li><p>NEW：支持查看任何用户的已创建相册列表</p></li>
    </ul>
    <h2 id="-">主要接口</h2>
    <ul>
      <li><p>首页列表 加一天缓存</p></li>
      <li><p>首页-随机获取相册</p></li>
      <li><p>图片上传 传到oss，返回url</p></li>
      <li><p>用户新建、编辑、删除相册</p></li>
      <li><p>用户收藏、取消收藏相册</p></li>
      <li><p>获取用户已上传相册 不分页</p></li>
      <li><p>获取用户已收藏相册 不分页</p></li>
      <li><p>获取所有相册 关键字查询、分页、类别筛选、点赞数、时间排序</p></li>
      <li><p>获取相册、照片留言</p></li>
      <li><p>添加、删除留言(未登录不可删除，已登陆可删除)</p></li>
      <li><p>我的留言列表 所有+按时间倒序+分页</p></li>
      <li><p>回复留言 通知被回复人，被回复人提示，被回复人获取回复信息</p></li>
      <li><p>获取自己名下是否有新留言，留言时设置 isNewComment</p></li>
    </ul>
    <p>排除自己给自己留言</p>
    <ul>
      <li>设置留言已读</li>
    </ul>
    <h2 id="-">数据库设计</h2>
    <ul>
      <li>
        <p>相册表 见 ></p>
      </li>
      <li>
        <p>留言表 见 ></p>
      </li>
      <li>
        <p>用户表新增字段</p>
        <p>albumCreation: string[] // 已创建相册id</p>
        <p>albumCollection: string[] // 已收藏相册id</p>
        <p>isNewComment: boolean // 相册留言通知</p>
      </li>
    </ul>
    <h2 id="-">技术方案</h2>
    <ul>
      <li><p>后端共用【光之演奏家】的云开发+serverless</p></li>
      <li><p>GSAP ?</p></li>
      <li><p>webGL × 不合适，svg滤镜 x 限制太多不用</p></li>
      <li><p>为避免和【光之演奏家】冲突，不使用PWA</p></li>
    </ul>
    <h2 id="-">其他细节</h2>
    <ul>
      <li><p>涉及到url分享的，使用短id</p></li>
      <li><p>自定义鼠标指针，选中样式</p></li>
      <li><p>移动端使用陀螺仪数据设置位移</p></li>
      <li><p>❌自定义照片边框 类似铭牌？</p></li>
      <li><p>✔️上传转为 webp + 生成缩略图转为base64，作为底部按钮</p></li>
      <li><p>✔️图片预加载</p></li>
      <li><p>✔️首页、搜索、已发布、已收藏 列表接口增加缩略图数据</p></li>
    </ul>
    <h2 id="-">评论区细节</h2>
    <ol>
      <li><p>只有登录可回复</p></li>
      <li><p>只有自己能删除自己的留言，自己不能回复自己的留言</p></li>
      <li><p>已删除的留言不能回复</p></li>
      <li><p>✔️删除留言需要二次确认</p></li>
      <li><p>✔️留言列表自动滚动到底部</p></li>
      <li><p>🤔初始化、新增留言增加过渡动画</p></li>
    </ol>
    <h2 id="-">新建|编辑细节</h2>
    <ol>
      <li><p>打开入口：右上角新建+我的相册编辑+相册详情编辑+当前详情右侧编辑</p></li>
      <li><p>✔️拖拽上传图片+批量 单个选中上传图片</p></li>
      <li>
        <p>✔️<del>拖拽排序</del> 左右上下交换排序</p>
      </li>
      <li><p>✔️方向旋转</p></li>
      <li><p>类型：人像|景物 暂定两个</p></li>
    </ol>
    <h2 id="-">我的消息细节</h2>
    <ol>
      <li>新消息通知 提示音 FFXIV_Notification.mp3</li>
    </ol>
    <h2 id="-">右侧菜单</h2>
    <ol>
      <li><p>设置缩放</p></li>
      <li><p>眩光配置</p></li>
      <li><p>光晕配置</p></li>
      <li><p>设置喜欢</p></li>
      <li><p>打开编辑 - 仅本人创建</p></li>
      <li><p>新标签页打开原图</p></li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
  export type AboutType = 'about' | 'update' | 'guide';

  const props = defineProps<{
    type: AboutType;
  }>();
</script>

<style lang="scss" scoped>
  .title {
    margin-bottom: 24px;
  }

  .about-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .desc {
      margin-top: 12px;
      font-size: 18px;
      transform: translateX(50%);

      &::before {
        content: '-- ';
      }
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
  }

  .guide-content {
    height: fit-content;
    padding: 0 12px 0 32px;
    padding-bottom: 120px;

    a {
      color: #00bcd4;
    }

    h2 {
      margin: 12px 0;
    }

    li {
      padding: 8px 0;
    }

    p {
      padding: 8px 0;
    }
  }

  @include media-breakpoint-down(md) {
    .about-content .desc {
      transform: none;

      &::before {
        content: '';
      }
    }
  }
</style>
