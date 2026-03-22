import userSlice, { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getUser, 
  updateUser, 
  authCheck 
} from './userSlice';

const mockUser = {
  email: 'test@test.com',
  name: 'Test User'
};

describe('userSlice', () => {
  const initialState = userSlice(undefined, { type: 'unknown' });

  it('должен возвращать initialState', () => {
    expect(userSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('registerUser.pending - устанавливает loading=true', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('registerUser.fulfilled - сохраняет пользователя', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('registerUser.rejected - сохраняет ошибку', () => {
    const action = { type: registerUser.rejected.type, error: { message: 'Ошибка' } };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('loginUser.pending - устанавливает loading=true', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('loginUser.fulfilled - сохраняет пользователя', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('loginUser.rejected - сохраняет ошибку', () => {
    const action = { type: loginUser.rejected.type, error: { message: 'Ошибка входа' } };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка входа');
  });

  it('logoutUser.fulfilled - очищает пользователя', () => {
    const loggedState = { ...initialState, user: mockUser };
    const action = { type: logoutUser.fulfilled.type };
    const state = userSlice(loggedState, action);
    expect(state.user).toBeNull();
  });

  it('getUser.pending - устанавливает loading=true', () => {
    const action = { type: getUser.pending.type };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('getUser.fulfilled - сохраняет пользователя', () => {
    const action = { type: getUser.fulfilled.type, payload: mockUser };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('getUser.rejected - сохраняет ошибку и authChecked', () => {
    const action = { type: getUser.rejected.type, error: { message: 'Ошибка' } };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
    expect(state.isAuthChecked).toBe(true);
  });

  it('updateUser.pending - устанавливает loading=true', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('updateUser.fulfilled - обновляет пользователя', () => {
    const updatedUser = { email: 'new@test.com', name: 'New Name' };
    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(updatedUser);
  });

  it('updateUser.rejected - сохраняет ошибку', () => {
    const action = { type: updateUser.rejected.type, error: { message: 'Ошибка обновления' } };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка обновления');
  });

  it('authCheck - устанавливает isAuthChecked=true', () => {
    const action = authCheck();
    const state = userSlice(initialState, action);
    expect(state.isAuthChecked).toBe(true);
  });
});