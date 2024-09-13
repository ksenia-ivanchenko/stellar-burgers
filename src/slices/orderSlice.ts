import { getOrderByNumberApi, orderBurgerApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const addOrder = createAsyncThunk(
  'userOrder/createNew',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrder = createAsyncThunk(
  'userOrder/getByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

type TOrderState = {
  orderModalData: TOrder | null;
  orderRequest: boolean;
  loading: boolean;
  error?: string | null;
};

const initialState: TOrderState = {
  orderModalData: null,
  orderRequest: false,
  loading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.order;
      }),
      builder
        .addCase(getOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(getOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.orderModalData = action.payload.orders[0];
        });
  }
});

export const { clearOrderModalData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
