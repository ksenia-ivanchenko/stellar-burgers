import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
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
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  // async ({ email, password }: TLoginData) => {
  //   const res = await loginUserApi({ email, password });
  //   setCookie('accessToken', res.accessToken);
  //   localStorage.setItem('refreshToken', res.refreshToken);
  //   return res;
  // }
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
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
        .then((res) => dispatch(setUser(res.user)))
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

type TUserState = {
  isAuthChecked: boolean;
  loading: boolean;
  user: TUser | null;
  error?: string | null;
};

const initialState: TUserState = {
  isAuthChecked: false,
  loading: false,
  user: null,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      });

    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      });
  }
});

export const userReducer = userSlice.reducer;
export const { setUser, authChecked } = userSlice.actions;
