# 光之摄影师 Photographer-Of-Light

一个专为FF14打造的照片分享网站

## 特色

* FF14 only
* 由于主要功能是照片展示，视觉效果和交互需要有特色
渐变、模糊、动画、滤镜、噪点、音效、切换过渡效果、微交互

## 主要页面

所有功能集合到一个页面，不分其他路由。
原型 <https://alidocs.dingtalk.com/i/nodes/KGZLxjv9VGXANMb7sEmggYBOJ6EDybno?utm_scene=person_space>

* 首页-照片展示页
  查看当前相册的照片，切换
  搜索相册
  点赞相册-仅登录
  查看、写、删除留言

* 个人中心
  查看、管理用户已上传的相册
  查看、管理相册里的照片
  查看、回复留言

## 主要功能

* 照片查看效果 3D悬浮+闪光  可配置，配置记录在本地
* 照片查看支持放大
* 鼠标位置移动时的位移效果
* 照片切换时的效果 模糊过渡+滤镜
* 相册搜索 内置tag，tag参考光之收藏家？
* QQ登录，共用光之演奏家的
* 分享 QQ+微信+B站
* 移动端适配
* 音效 使用FF14内置音效  新留言提示用邮箱音效
* 图片上传 原图上传，超过5m给压缩提示？
* 留言功能？相册+照片
* 接入百度统计

## 主要接口

* 图片上传 传到oss，返回url
* 用户新建、编辑、删除相册
* 用户点赞、取消点赞相册
* 获取用户已上传相册
* 获取用户已点赞相册
* 获取所有相册 关键字查询、分页、类别筛选、点赞数、时间排序
* 获取相册、照片留言
* 添加、删除留言(未登录不可删除，已登陆可删除)
* 留言列表 所有+按时间倒序+分页
* 回复留言 通知被回复人，被回复人提示，被回复人获取回复信息
* 获取自己名下是否有新留言，留言时设置 isNewComment
排除自己给自己留言
* 设置留言已读

## 数据库设计

* 相册表  见<https://alidocs.dingtalk.com/i/nodes/vy20BglGWO7gmZnDU39ZN1wwWA7depqY>
* 留言表 见<https://alidocs.dingtalk.com/i/nodes/vy20BglGWO7gmZnDU39ZN1wwWA7depqY>
* 用户表新增字段
点赞相册id列表 albumId
是否有新留言标记 isNewComment

## 其他细节

* 使用短id 相册、照片id做区分
* 自定义鼠标指针，选中样式
* 根据上传图片名自动解析拍摄时间
* 移动端使用陀螺仪数据设置位移
* 自定义照片边框 类似铭牌
* 上传前获取图片主色调，[左上，右上，右下，左下，中间],作为加载时的渐变背景色

## 相关网站

* 光之演奏家 <https://fffff.games>
* 伊茜丝相册 <https://fffff.games/yixisi>
* 卡片闪光效果demo <https://fffff.games/card>
* svg滤镜示例 <https://alexisgaillard.work/en/>

## 尝试

* pixi webgl shader 滤镜选择 + 配置菜单 【废弃】
  `https://www.jianshu.com/p/725b95df0f8b`
  `https://filters.pixijs.download/main/demo/index.html?enabled=AsciiFilter`

  和其他照片处理应用没区别，唯一的特色是基于webgl的shader，其他都比不过

* 基于 css transform 3D卡片

 1. atropos库 比较一般 ×
 2. 类似svelte spring 弹簧运动函数，有回弹效果 √

* 基于 css background 炫光效果

* svg滤镜
