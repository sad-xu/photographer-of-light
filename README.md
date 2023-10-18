# 光之摄影师 Photographer-Of-Light

卡片形式的图片分享网站

## TODO

## 功能

* 已登录用户 QQ互联

上传图片|图片链接 1-9张
总标题必填 + 每张底下有非必填简介
是否公开(默认公开) 是否显示qq信息(默认显示)
分享 - 保存配置，生成短链id

* 所有人

随机看一个已公开

## 接口

* 上传图片 仅已登录

* 新建|编辑|删除分享 title,imgList:{url,size,desc}[],creator,createTime,isPublic 返回短链id

* 根据短链id获取详情

* 随机获取一个已公开详情

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
