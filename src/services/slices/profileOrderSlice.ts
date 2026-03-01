import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { RootState } from '../store';

export const getProfileOrders = createAsyncThunk(
  'profileOrders/getAll',
  getOrdersApi
);

type TProfileOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  loading: false,
  error: null
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getProfileOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки истории заказов';
      });
  }
});

export const profileOrdersSelector = (state: RootState) =>
  state.profileOrders.orders;
export const profileOrdersLoadingSelector = (state: RootState) =>
  state.profileOrders.loading;

export { profileOrdersSlice };
export default profileOrdersSlice.reducer;
