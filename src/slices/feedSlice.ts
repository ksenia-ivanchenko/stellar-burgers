import { getFeedsApi, orderBurgerApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export const getFeed = createAsyncThunk<TOrdersData>(
  'feed/getAll',
  async () => await getFeedsApi()
);

type TFeedState = {
  feedData: TOrdersData;
  loading: boolean;
  error?: string | null;
};

const initialState: TFeedState = {
  feedData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addNewOrder: (state, action: PayloadAction<TOrder>) => {
      state.feedData.orders.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feedData = action.payload;
      });
  }
});
export const { addNewOrder } = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
