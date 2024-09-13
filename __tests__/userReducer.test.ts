import {
  userReducer,
  initialState,
  setUser,
  authChecked,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  forgotPassword,
  resetPassword
} from '../src/slices/userSlice';

const mockUser = {
  email: 'test@mail.ru',
  name: 'Ivan'
};

describe('user reducers', () => {
  test('setUser should set user data to store', () => {
    const state = userReducer(initialState, setUser(mockUser));
    expect(state).toEqual({ ...initialState, user: mockUser });
  });
  test('authChecked should switch isAuthChecked', () => {
    const state = userReducer(initialState, authChecked());
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });
});

describe('loginUser extra reducer', () => {
  test('should switch loading while loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  test('should set user data to store while loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    });
  });

  test('should correctly return errors', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected',
      isAuthChecked: true
    });
  });
});

describe('registerUser extra reducer', () => {
  test('should switch loading while registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  test('should set user data to store while registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    });
  });

  test('should correctly return errors', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected',
      isAuthChecked: true
    });
  });
});

describe('updateUser extra reducer', () => {
  test('should switch loading while updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  test('should set new user data to store while updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUser
    });
  });

  test('should correctly return errors', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected'
    });
  });
});

describe('logoutUser extra reducer', () => {
  test('should switch loading while logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  test('should remove user data from store while logoutUser.fulfilled', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  test('should correctly return errors', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected'
    });
  });
});

describe('forgotPassword extra reducer', () => {
  test('should switch loading while forgotPassword.pending', () => {
    const action = { type: forgotPassword.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  test('should set loading=false while forgotPassword.fulfilled', () => {
    const action = {
      type: forgotPassword.fulfilled.type
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  test('should correctly return errors', () => {
    const action = {
      type: forgotPassword.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected'
    });
  });
});

describe('resetPassword extra reducer', () => {
    test('should switch loading while resetPassword.pending', () => {
      const action = { type: resetPassword.pending.type };
      const state = userReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true });
    });
  
    test('should set loading=false while resetPassword.fulfilled', () => {
      const action = {
        type: resetPassword.fulfilled.type
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  
    test('should correctly return errors', () => {
      const action = {
        type: resetPassword.rejected.type,
        error: { message: 'request rejected' }
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        error: 'request rejected'
      });
    });
  });
