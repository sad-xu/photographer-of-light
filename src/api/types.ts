/** 单张照片 */
export interface Photo {
  id: string;
  name: string;
  url: string;
  /** 原始宽高 */
  width: number;
  height: number;
  /** 缩略图base64 */
  thumbnail: string;
  /** 是否已缓存 */
  isLoaded?: boolean;
}

/** 相册 */
export interface Album {
  id: string;
  name: string;
  userId: string;
  userName: string;
  desc: string;
  /** 点赞数 */
  star: number;
  /** 照片数 */
  photoNum: number;
  /** 评论数 */
  commentNum: number;
  createTime: number;
  updateTime: number;
  photos: Photo[];
  comments: Comment[];
  /** 标签 */
  tags: string[];
  deleted?: boolean;
}

/** 留言 */
export interface Comment {
  _id: string;
  /** 被回复的相册id */
  albumId: string;
  /** 被回复的相册名 */
  albumName: string;
  /** 相册作者id */
  albumAuthorId: string;
  /** 回复人信息 */
  replierId: string;
  replierName: string;
  avatar: string;
  content: string;
  t: number;
  deleted?: boolean;
  /** 被回复的留言id */
  replyId?: string;
  /** 显示用 */
  children?: Comment[];
}

/**
 * event 监听报错事件
 * rejection 异步报错未处理
 * boundary react-错误边界
 * request 服务端错误
 * resource 资源加载失败
 */
export type ErrSource = 'event' | 'rejection' | 'boundary' | 'request' | 'resource';

export default interface Err {
  _id: string;
  // 错误来源
  source: ErrSource;
  // 报错信息
  msg: string;
  // 错误堆栈
  stack: string;
  // 浏览器信息
  agent: string;
  // 尺寸
  size: string;
  // 用户id 可选
  userId: string;
  // 错误发生时间
  t: number;
}
