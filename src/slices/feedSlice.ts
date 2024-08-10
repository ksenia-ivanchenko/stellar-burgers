import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

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
  reducers: {},
  selectors: {
    getFeedSelector: (state) => state
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

// export const { getIngredientsSelector } = ingredientsSlice.selectors;
export const feedReducer = feedSlice.reducer;
