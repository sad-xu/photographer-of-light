import request from '@/utils/request';
import { Msg } from './types';

const urlUser = '/api/user';
const urlMsg = '/api/msg';

/** 获取本人信息 */
export function fetchSelfInfo() {
  return request({
    url: urlUser + '/self',
  });
}

/** 修改名字 */
export function changeName(newName: string) {
  return request({
    url: urlUser + '/changename',
    method: 'post',
    data: {
      newName,
    },
  });
}

/** 获取自己的留言列表 */
export function fetchUserMsg() {
  return request<Msg[]>({
    url: urlMsg + '/user',
  });
}

/** 获取自己是否有新留言 */
export function fetchIsNewMsg() {
  return request<boolean>({
    url: urlUser + '/isNewMsg',
  });
}

/** 设置自己的留言已读 */
export function setMsgRead() {
  return request({
    url: urlUser + '/setMsgRead',
  });
}

/** 点赞相册 */
export function collectAlbum(id: string) {
  return request({
    url: urlUser + '/album/collect',
    method: 'post',
    data: { id },
  });
}

/** 取消点赞相册 */
export function unCollectAlbum(id: string) {
  return request({
    url: urlUser + '/album/uncollect',
    method: 'post',
    data: { id },
  });
}

/** 获取用户自己的相册列表 */
export function fetchUserCreateAlbum() {
  return request({
    url: urlUser + '/album/create',
  });
}

/** 获取用户点赞的相册列表 */
export function fetchUserCollectAlbum() {
  return request({
    url: urlUser + '/album/collect',
  });
}
