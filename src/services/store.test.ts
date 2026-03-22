import store from './store';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';
import profileOrdersReducer from './slices/profileOrderSlice';

describe('rootReducer', () => {
  it('проверка что rootReducer инициализируется с корректным initialState', () => {
    const initialState = store.getState();

    expect(initialState).toEqual({
      ingredients: ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      burgerConstructor: constructorReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      order: orderReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      user: userReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      feed: feedReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      profileOrders: profileOrdersReducer(undefined, { type: 'UNKNOWN_ACTION' })
    });
  });
});