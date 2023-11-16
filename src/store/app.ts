import { defineStore } from 'pinia';
import { USER_ID_KEY, NAME_KEY, AVATAR_KEY, TOKEN_KEY } from '@/utils';

export interface UserInfo {
  _id: string;
  name: string;
  avatar: string;
  token: string;
}

export interface EditConfig {
  editVisible: boolean;
  editId: string;
}

export interface AppState extends UserInfo, EditConfig {
  detailId: string;
}

const searchUrl = window.location.search;
let defaultDetailId = '';
if (searchUrl) {
  const arr = searchUrl.split('album=');
  if (arr.length > 1) {
    defaultDetailId = arr[1].split('&')[0];
  }
}

export const useStore = defineStore('app', {
  state: (): AppState => ({
    // 个人信息
    _id: window.localStorage.getItem(USER_ID_KEY) || '123',
    name: window.localStorage.getItem(NAME_KEY) || 'testName',
    avatar:
      window.localStorage.getItem(AVATAR_KEY) ||
      'https://i1.hdslb.com/bfs/face/bf80ff5f3ce928757f766057fbde3d723e88f0ac.jpg@96w_96h',
    token: window.localStorage.getItem(TOKEN_KEY) || 'aaa',
    // 编辑状态
    editVisible: false,
    editId: '',
    // 当前详情id
    detailId: defaultDetailId,
  }),
  getters: {
    userInfo(state: UserInfo) {
      return {
        id: state._id,
        name: state.name,
        avatar: state.avatar,
      };
    },
    editConfig(state: EditConfig) {
      return {
        editVisible: state.editVisible,
        editId: state.editId,
      };
    },
  },
  actions: {
    // 设置个人信息
    setUserInfo({ _id, name, avatar, token }: any) {
      this._id = _id;
      this.name = name;
      this.avatar = avatar;
      this.token = token;
    },
    // 打开编辑
    openEdit(editId?: string) {
      this.editId = editId ?? '';
      this.editVisible = true;
    },
    // 关闭编辑
    closeEdit() {
      this.editVisible = false;
    },
    // 设置详情id
    setDetailId(id: string) {
      this.detailId = id;
      const location = window.location;
      const url = location.origin + location.pathname + (id ? `?album=${id}` : '');
      window.history.pushState({}, '', url);
    },
    // 点赞
    // 取消点赞
  },
});

export default useStore;
