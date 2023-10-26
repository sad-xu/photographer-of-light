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
