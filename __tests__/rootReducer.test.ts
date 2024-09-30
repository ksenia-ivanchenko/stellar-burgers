import { store } from '../src/services/store';
import { burgerConstructorReducer } from '../src/slices/burgerConstructorSlice';
import { ingredientsReducer } from '../src/slices/ingredientsSlice';

describe('rootReducer', () => {
  test('initial state of the root reducer matches what child reducers return given an empty action', () => {
    expect(store.getState().ingredients).toEqual(
      ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });
});
