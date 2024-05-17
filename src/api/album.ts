import request from '@/utils/request';
import { Album } from './types';

const urlAlbum = '/api/album';
const urlManage = '/api/manage';

/** 模拟请求 */
export function mockRequest(d: any, t = 800) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(d);
    }, t);
  });
}

/** 判断是否管理员 */
export function checkIsAdmin() {
  return request<boolean>({
    url: urlManage + '/check',
  });
}

/** 获取相册列表 分页 */
export function getAlbumList(params: any) {
  return request({
    url: urlAlbum + '/list',
    method: 'get',
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
export function createAlbum(album: any) {
  return request({
    url: urlAlbum + '/create',
    method: 'post',
    data: album,
  });
}

/** 编辑相册 */
export function editAlbum(album: any) {
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

/** 取消删除相册 */
export function unDelteAlbum(albumId: string) {
  return request({
    url: urlAlbum + '/undelete/' + albumId,
    method: 'post',
  });
}

/** 获取相册详情 */
export function fetchAlbumDetail(albumId: string) {
  return request<Album>({
    url: urlAlbum + '/' + albumId,
  });
}

/** 获取相册详情 管理员使用 */
export function fetchAdminAlbumDetail(albumId: string) {
  return request<Album>({
    url: urlAlbum + '/admin/' + albumId,
  });
}

/** 首页数据 */
// export function fetchHomeList() {
//   return request({
//     url: urlAlbum + '/home-list',
//   });
// }

/** 随机相册列表 */
// export function fetchRandomList() {
//   return request({
//     url: urlAlbum + '/random-list',
//   });
// }

/** 搜索相册 */
// export function searchAlbum(params: any) {
//   return request<Album[]>({
//     url: urlAlbum + '/search',
//     params,
//   });
// }

/** 添加留言 */
// export function addMsg(d: Comment) {
//   return request({
//     url: urlAlbum + '/comment/add',
//     method: 'post',
//     data: d,
//   });
// }

/** 删除留言 */
// export function deleteMsg(commentId: string) {
//   return request({
//     url: urlAlbum + '/comment/delete/' + commentId,
//     method: 'post',
//   });
// }
