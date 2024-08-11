import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { setUser, authChecked } from './userSlice';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const res = await loginUserApi({ email, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const res = await logoutApi();
  deleteCookie('accessToken');
  localStorage.clear();
  return res;
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) => {
    const res = await registerUserApi({ email, name, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ email, name, password }: Partial<TRegisterData>) => {
    await updateUserApi({ email, name, password });
    return getUserApi();
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => setUser(res.user))
        .catch(() => {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
        })
        .finally(() => {
          dispatch(authChecked());
        });
    } else {
      dispatch(authChecked());
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'password/forgot',
  async ({ email }: { email: string }) => {
    await forgotPasswordApi({ email }).then(() => {
      localStorage.setItem('resetPassword', 'true');
    });
  }
);

export const resetPassword = createAsyncThunk(
  'password/reset',
  async ({ password, token }: { password: string; token: string }) => {
    await resetPasswordApi({ password, token }).then(() => {
      localStorage.setItem('resetPassword', 'true');
    });
  }
);
