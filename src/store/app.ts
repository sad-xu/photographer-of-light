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

export const useStore = defineStore('app', {
  state: (): AppState => ({
    // 个人信息
    _id: window.localStorage.getItem(USER_ID_KEY) || '123',
    name: window.localStorage.getItem(NAME_KEY) || 'testName',
    avatar:
      window.localStorage.getItem(AVATAR_KEY) ||
      'https://p9-passport.byteacctimg.com/img/user-avatar/43bae177b0e70454e80529f2c9ea5295~50x50.awebp',
    token: window.localStorage.getItem(TOKEN_KEY) || 'aaa',
    // 编辑状态
    editVisible: false,
    editId: '',
    // 当前详情id
    detailId: '',
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
    },
    // 点赞
    // 取消点赞
  },
});

export default useStore;
