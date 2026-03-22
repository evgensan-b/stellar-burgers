import profileOrdersSlice, { getProfileOrders } from './profileOrderSlice';
import { TOrder } from '../../utils/types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Мой заказ 1',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    number: 12345,
    ingredients: ['1', '2']
  }
];

describe('profileOrdersSlice', () => {
  const initialState = profileOrdersSlice(undefined, { type: 'unknown' });

  it('должен возвращать initialState', () => {
    expect(profileOrdersSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('getProfileOrders.pending - устанавливает loading=true', () => {
    const action = { type: getProfileOrders.pending.type };
    const state = profileOrdersSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('getProfileOrders.fulfilled - сохраняет заказы', () => {
    const action = { type: getProfileOrders.fulfilled.type, payload: mockOrders };
    const state = profileOrdersSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('getProfileOrders.rejected - сохраняет ошибку', () => {
    const action = { type: getProfileOrders.rejected.type, error: { message: 'Ошибка' } };
    const state = profileOrdersSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});