import feedSlice, { getFeeds } from './feedSlice';
import { TOrder } from '../../utils/types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Бургер 1',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    number: 12345,
    ingredients: ['1', '2']
  },
  {
    _id: '2',
    status: 'pending',
    name: 'Бургер 2',
    createdAt: '2025-01-02',
    updatedAt: '2025-01-02',
    number: 12346,
    ingredients: ['3', '4']
  }
];

const mockPayload = {
  orders: mockOrders,
  total: 100,
  totalToday: 10
};

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  it('должен возвращать initialState', () => {
    expect(feedSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('getFeeds.pending - устанавливает loading=true', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedSlice(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('getFeeds.fulfilled - сохраняет данные и снимает loading', () => {
    const action = { type: getFeeds.fulfilled.type, payload: mockPayload };
    const state = feedSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('getFeeds.rejected - сохраняет ошибку и снимает loading', () => {
    const action = { type: getFeeds.rejected.type, error: { message: 'Ошибка загрузки' } };
    const state = feedSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});