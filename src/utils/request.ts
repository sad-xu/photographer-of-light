import { uploadErr } from '@/api/base';
import axios, { AxiosRequestConfig } from 'axios';
import createMessage from '@/common/message';
import { TOKEN_KEY } from '@/utils';

interface BaseResponse<T> {
  code: number;
  data: T;
  msg: string;
}

interface RequestConfig extends AxiosRequestConfig {
  quiet?: boolean;
}

const isDev = process.env.NODE_ENV === 'development';

const axiosInstance = axios.create({
  baseURL: isDev ? '' : 'https://service-azztq3d7-1304999371.sh.apigw.tencentcs.com/release',
});

(axiosInstance.defaults.headers as any)[TOKEN_KEY] = localStorage.getItem(TOKEN_KEY) || '';

axiosInstance.interceptors.request.use(
  (config) => {
    // 清除空字段
    if (config.params) {
      const params = config.params;
      Object.keys(params).forEach((k) => {
        if (!params[k]) {
          delete params[k];
        }
      });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const request = async <T = any>(config: RequestConfig): Promise<T> => {
  try {
    const { data } = await axiosInstance.request<BaseResponse<T>>(config);
    const code = data.code;
    if (code) {
      if (code === -401) {
        // token 无效
        // message.error('需要登录哦');
        // TODO: 清除本地身份
      } else if (code === -403) {
        // message.error('权限不足');
      }
      return Promise.reject(data);
    } else return data.data;
  } catch (err) {
    // 500 / 网络异常

    // 异常上报
    if (config.url !== '/api/base/upload-err') {
      uploadErr('request', (err as any)?.message, JSON.stringify(config));
    }

    // message.error('ಥ_ಥ');
    return Promise.reject(err);
  }
};

export { axiosInstance };
export default request;
