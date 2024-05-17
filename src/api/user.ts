// import request from '@/utils/request';

// const urlAlbum = '/api/album';
// const urlUser = '/api/user';

/** 获取本人信息 */
// export function fetchSelfInfo() {
//   return request({
//     url: urlAlbum + '/self',
//   });
// }

/** 修改名字 */
// export function changeName(newName: string) {
//   return request({
//     url: urlUser + '/changename',
//     method: 'post',
//     data: {
//       newName,
//     },
//   });
// }

/** 获取自己的留言列表 */
// export function fetchUserMsg() {
//   return request<Comment[]>({
//     url: urlAlbum + '/comment',
//   });
// }

/** 收藏相册 */
// export function collectAlbum(id: string) {
//   return request({
//     url: urlAlbum + '/collect',
//     method: 'post',
//     data: { id },
//   });
// }

/** 取消收藏相册 */
// export function unCollectAlbum(id: string) {
//   return request({
//     url: urlAlbum + '/uncollect',
//     method: 'post',
//     data: { id },
//   });
// }

/** 获取指定用户已创建相册列表 */
// export function fetchUserCreateAlbum(userId: string) {
//   return request({
//     url: urlAlbum + '/creation/' + userId,
//   });
// }

/** 获取用户已收藏相册列表 */
// export function fetchUserCollectAlbum() {
//   return request({
//     url: urlAlbum + '/collection',
//   });
// }
