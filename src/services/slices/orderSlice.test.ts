import orderSlice, { orderBurger, closeOrderModal } from './orderSlice';
import { TOrder } from '../../utils/types';

const mockOrder: TOrder = {
  _id: '123',
  status: 'done',
  name: 'Бургер',
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
  number: 12345,
  ingredients: ['1', '2']
};

describe('orderSlice', () => {
  const initialState = orderSlice(undefined, { type: 'unknown' });

  it('должен возвращать initialState', () => {
    expect(orderSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен установить orderRequest=true при orderBurger.pending', () => {
    const action = { type: orderBurger.pending.type };
    const state = orderSlice(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен установить orderModalData при orderBurger.fulfilled', () => {
    const action = { type: orderBurger.fulfilled.type, payload: { order: mockOrder } };
    const state = orderSlice(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  it('должен записать ошибку при orderBurger.rejected', () => {
    const action = { type: orderBurger.rejected.type, error: { message: 'Ошибка заказа' } };
    const state = orderSlice(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка заказа');
  });

  it('должен закрыть модальное окно', () => {
    const filledState = {
      orderRequest: false,
      orderModalData: mockOrder,
      error: null
    };
    const action = closeOrderModal();
    const state = orderSlice(filledState, action);
    expect(state.orderModalData).toBeNull();
    expect(state.error).toBeNull();
  });
});