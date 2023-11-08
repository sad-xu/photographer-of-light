import { InjectionKey } from 'vue';
import { USER_ID_KEY, TOKEN_KEY, NAME_KEY, AVATAR_KEY } from './utils';

export const STORE_USER_ID: InjectionKey<string> = Symbol(USER_ID_KEY);
export const STORE_TOKEN: InjectionKey<string> = Symbol(TOKEN_KEY);
export const STORE_NAME: InjectionKey<string> = Symbol(NAME_KEY);
export const STORE_AVATAR: InjectionKey<string> = Symbol(AVATAR_KEY);
