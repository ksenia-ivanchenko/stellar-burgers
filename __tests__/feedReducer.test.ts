import {
  addNewOrder,
  feedReducer,
  getFeed,
  initialState
} from '../src/slices/feedSlice';

const mockOrder = {
  _id: '1234',
  status: 'ready',
  name: 'order',
  createdAt: 'date',
  updatedAt: 'date',
  number: 1234,
  ingredients: ['1', '2', '3', '4']
};

const mockFeeds = {
  orders: [mockOrder],
  total: 1,
  totalToday: 1
};

test('addNewOrder should correctly add new order', () => {
  const state = feedReducer(initialState, addNewOrder(mockOrder));
  expect(state.feedData.orders).toEqual([mockOrder]);
});

describe('getFeed extra reducer', () => {
  test('should switch loading while getFeed.pending', () => {
    const action = { type: getFeed.pending.type };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  test('should return feeds while getFeed.fulfilled', () => {
    const action = {
      type: getFeed.fulfilled.type,
      payload: mockFeeds
    };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({ ...initialState, feedData: mockFeeds });
  });

  test('should correctly return errors', () => {
    const action = {
      type: getFeed.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected'
    });
  });
});
