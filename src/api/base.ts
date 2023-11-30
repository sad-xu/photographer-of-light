import { ErrSource } from './types';
// import request from '@/utils/request';

const urlBase = '/api/base';

// 用户反馈
// export function uploadFeedback(content: string, name?: string) {
//   return request({
//     url: urlBase + '/feedback',
//     method: 'post',
//     data: {
//       content,
//       name,
//     },
//   });
// }

// 异常收集 三处
export function uploadErr(source: ErrSource, msg: string = 'unkonwn', stack: string = '') {
  return;
  // if (process.env.NODE_ENV === 'development') return
  // const agent = navigator.userAgent
  // // 忽略 google 爬虫机器人
  // if (agent.indexOf('Googlebot') !== -1) return
  // return request({
  //   url: urlBase + '/upload-err',
  //   method: 'post',
  //   quiet: true,
  //   data: {
  //     source,
  //     msg,
  //     stack,
  //     agent,
  //     size: `${window.innerWidth},${window.innerHeight}`
  //   }
  // }).catch((err) => {
  //   console.log('send err failer', err)
  // })
}
