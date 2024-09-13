import {
  clearOrderModalData,
  orderReducer,
  initialState,
  addOrder,
  getOrder
} from '../src/slices/orderSlice';

const mockOrder = {
  _id: '1234',
  status: 'ready',
  name: 'order',
  createdAt: 'date',
  updatedAt: 'date',
  number: 1234,
  ingredients: ['1', '2', '3', '4']
};

const stateWithData = {
  orderModalData: mockOrder,
  orderRequest: false,
  loading: false,
  error: null
};

test('clearOrderModalData should remove data about order from store', () => {
  const state = orderReducer(stateWithData, clearOrderModalData());
  expect(state).toEqual(initialState);
});

describe('addOrder extra reducer', () => {
  test('should switch loading while addOrder.pending', () => {
    const action = { type: addOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      orderRequest: true
    });
  });

  test('should add order data to store while addOrder.fulfilled', () => {
    const action = {
      type: addOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderModalData: mockOrder });
  });

  test('should correctly return errors', () => {
    const action = {
      type: addOrder.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected'
    });
  });
});

describe('getOrder extra reducer', () => {
  test('should switch loading while getOrder.pending', () => {
    const action = { type: getOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('should return order data while getOrder.fulfilled', () => {
    const action = {
      type: getOrder.fulfilled.type,
      payload: { orders: [mockOrder] }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderModalData: mockOrder });
  });

  test('should correctly return errors', () => {
    const action = {
      type: getOrder.rejected.type,
      error: { message: 'request rejected' }
    };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'request rejected'
    });
  });
});
