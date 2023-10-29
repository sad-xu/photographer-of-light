/** 单张照片 */
export interface Photo {
  id: number;
  url: string;
  desc: string;
  /** 原始宽高 */
  width: number;
  height: number;
  /** 主色调列表 */
  colors: string[];
}

/** 相册 */
export interface Album {
  id: number;
  name: string;
  userId: string;
  userName: string;
  desc: string;
  star: number;
  createTime: number;
  updateTime: number;
  photos: Photo[];
  /** 标签 */
  tag: string[];
  deleted: boolean;
}

/** 留言 */
export interface Msg {
  _id: string;
  /** 被回复 相册|照片 id */
  id: number;
  ownerId: string;
  ownerName: string;
  avatar: string;
  content: string;
  t: number;
  deleted: boolean;
  /** 被回复的留言id */
  replyId?: string;
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
