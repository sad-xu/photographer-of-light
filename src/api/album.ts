import request from '@/utils/request';
import { Album, Comment } from './types';

const urlAlbum = '/api/album';

/** 模拟请求 */
export function mockRequest(d: any, t = 800) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(d);
    }, t);
  });
}

/** 首页数据 */
export function fetchHomeList() {
  return request({
    url: urlAlbum + '/home-list',
  });
}

/** 随机相册列表 */
export function fetchRandomList() {
  return request({
    url: urlAlbum + '/random-list',
  });
}

/** 搜索相册 */
export function searchAlbum(params: any) {
  return request<Album[]>({
    url: urlAlbum + '/search',
    params,
  });
}

/** 上传照片 form img rotate */
export function uploadImg(d: FormData) {
  return request({
    url: urlAlbum + '/upload-img',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: d,
  });
}

/** 新建相册 */
export function createAlbum(album: Album) {
  return request({
    url: urlAlbum + '/create',
    method: 'post',
    data: album,
  });
}

/** 编辑相册 */
export function editAlbum(album: Album) {
  return request({
    url: urlAlbum + '/edit',
    method: 'post',
    data: album,
  });
}

/** 删除相册 */
export function delteAlbum(albumId: string) {
  return request({
    url: urlAlbum + '/delete/' + albumId,
    method: 'post',
  });
}

/** 获取相册详情 评论可选 */
export function fetchAlbumDetail(albumId: string, noComment?: boolean) {
  return request<Album>({
    url: urlAlbum + '/detail/' + albumId,
    params: { noComment },
  });
}

/** 添加留言 */
export function addMsg(d: Comment) {
  return request({
    url: urlAlbum + '/comment/add',
    method: 'post',
    data: d,
  });
}

/** 删除留言 */
export function deleteMsg(commentId: string) {
  return request({
    url: urlAlbum + '/comment/delete/' + commentId,
    method: 'post',
  });
}
