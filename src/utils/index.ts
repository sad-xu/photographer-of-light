export const USER_ID_KEY = 'ff-user-id';
export const TOKEN_KEY = 'ff-token';
export const NAME_KEY = 'ff-name';
export const AVATAR_KEY = 'ff-avatar';

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

export default null;
