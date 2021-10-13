import { IUserState } from './state';

export const getters = {
    token: (state: IUserState) => state.token,
    userAvatar: (state: IUserState) => state.user_info.head_image,
    userInfo: (state: IUserState) => state.user_info,
};
