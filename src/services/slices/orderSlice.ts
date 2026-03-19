import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { RootState } from '../store';
import { resetConstructor } from './constructorSlice';

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[], { dispatch }) => {
    const response = await orderBurgerApi(data);
    dispatch(resetConstructor());
    return response;
  }
);

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка создания заказа';
      });
  }
});

export const orderRequestSelector = (state: RootState) =>
  state.order.orderRequest;
export const orderModalDataSelector = (state: RootState) =>
  state.order.orderModalData;
export const orderErrorSelector = (state: RootState) => state.order.error;

export const { closeOrderModal } = orderSlice.actions;
export { orderSlice };
export default orderSlice.reducer;
