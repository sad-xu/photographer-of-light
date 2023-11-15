import request from '@/utils/request';
import { Album, Comment } from './types';

const urlAlbum = '/api/album';
const urlMsg = '/api/msg';

/** 模拟请求 */
export function mockRequest(d: any, t = 800) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(d);
    }, t);
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

/** 获取相册详情 */
export function fetchAlbumDetail(id: string) {
  return request<Album>({
    url: urlAlbum + '/detail/' + id,
  });
}

/** 删除相册 */
export function delteAlbum(id: string) {
  return request<Album>({
    url: urlAlbum + '/delete',
    method: 'post',
    data: { id },
  });
}

/** 查询相册 */
export function searchAlbum(params: any) {
  return request<Album[]>({
    url: urlAlbum + '/search',
    params,
  });
}

/** 获取留言 相册|照片 */
export function fetchMsg(id: string) {
  return request<Comment[]>({
    url: urlMsg + '/' + id,
  });
}

/** 添加留言 */
export function addMsg(d: any) {
  return request({
    url: urlMsg + '/add',
    method: 'post',
    data: d,
  });
}

/** 删除留言 */
export function deleteMsg(id: string) {
  return request({
    url: urlMsg + '/delete',
    method: 'post',
    data: { id },
  });
}
