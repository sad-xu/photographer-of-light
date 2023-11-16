export const USER_ID_KEY = 'ff-user-id';
export const TOKEN_KEY = 'ff-token';
export const NAME_KEY = 'ff-name';
export const AVATAR_KEY = 'ff-avatar';

/** 背景动画 */
export const BG_VIDEO_LIST = [
  {
    name: '6.4',
    url: 'https://static.web.sdo.com/jijiamobile/pic/ff14/ffweb860/20230915vid.mp4',
  },
  {
    name: '6.3',
    url: 'https://static.web.sdo.com/jijiamobile/pic/ff14/ffweb860/2023ftsvid.mp4',
  },
  {
    name: '6.2',
    url: 'https://static.web.sdo.com/jijiamobile/pic/ff14/ffweb860/20221219vid.mp4',
  },
  {
    name: '6.1',
    url: 'https://static.web.sdo.com/jijiamobile/pic/ff14/ffweb860/20220808vid.mp4',
  },
  {
    name: '6.0',
    url: 'https://static.web.sdo.com/jijiamobile/pic/ff14/ffweb860/20220210vid.mp4',
  },
  {
    name: '5.5',
    url: 'https://static.web.sdo.com/jijiamobile/pic/ff14/ffweb850/20210809vid.mp4',
  },
  {
    name: '5.4',
    url: 'https://static.web.sdo.com/jijiamobile/pic/ff14/ffweb850/20210401vid.mp4',
  },
  {
    name: '5.2',
    url: 'https://event-5gdjtgwpc8ae552d-1304999371.tcloudbaseapp.com/cdn/5.2.mp4',
  },
  {
    name: '4.5',
    url: 'https://event-5gdjtgwpc8ae552d-1304999371.tcloudbaseapp.com/cdn/4.5.mp4',
  },
  {
    name: '4.x',
    url: 'https://event-5gdjtgwpc8ae552d-1304999371.tcloudbaseapp.com/cdn/4.x.mp4',
  },
  {
    name: 'ladiesday',
    url: 'https://static.web.sdo.com/jijiamobile/pic/ff14/20220514ladiesday/ffladiesday.mp4',
  },
];

const _symbols = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const _toBase = (decimal: number) => {
  let conversion = '';
  const base = _symbols.length;
  while (decimal >= 1) {
    conversion = _symbols[decimal - base * Math.floor(decimal / base)] + conversion;
    decimal = Math.floor(decimal / base);
  }
  return conversion;
};

/** 生成随机短id */
export function generateShortId() {
  const elapsed = Math.floor((+new Date() - 1698796800000) / 100);
  // 盐
  let salts = '';
  const padding = '0';
  for (let i = 0; i < 1; i++) {
    const salt = Math.floor(Math.random() * 3844);
    salts += (padding + _toBase(salt)).slice(-padding.length);
  }
  return _toBase(elapsed) + salts;
}

/** 时间显示 */
export function formatDate(t: number) {
  const now = new Date();
  const delta = Math.ceil((+now - t * 1000) / 1000);
  if (delta < 0) return '未来';
  else if (delta < 60) return '刚刚';
  else if (delta < 3600) return `${Math.ceil(delta / 60)}分钟前`; // 1 - 59分
  else if (delta < 86400) return `${Math.ceil(delta / 3600)}小时前`; // 1-23小时
  else if (delta < 2592000) return `${Math.ceil(delta / 86400)}天前`; // 1-30天
  else {
    // xxxx年x月x日 xx:xx
    const d = new Date(t * 1000);
    const year = d.getFullYear();
    const h = d.getHours();
    const m = d.getMinutes();
    return `${now.getFullYear() === year ? '' : year + '年'}${d.getMonth() + 1}月${d.getDate()}日 ${
      h > 9 ? '0' + h : h
    }:${m > 9 ? '0' + m : m}`;
  }
  return '';
}

export default null;
