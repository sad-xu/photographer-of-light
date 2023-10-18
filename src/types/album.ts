/** 相册 */
export interface Album {
  // id
  id: string;
  // 相册名
  title: string;
  // 照片列表
  photos: Photo[];
  // 创建人id
  creatorId: string;
  // 创建人昵称
  creatorName: string;
  // 创建时间
  createTime: string;
  // 修改时间
  editTime?: string;
}

/** 照片 */
export interface Photo {
  // 照片url
  url: string;
  // 简介
  desc: string;
  // 原始宽
  width: number;
  // 原始高
  height: number;
  // 展示配置 json字符串
  config?: string;
}
