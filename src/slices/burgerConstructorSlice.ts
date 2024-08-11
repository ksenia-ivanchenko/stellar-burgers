import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TMoveIngredient } from '@utils-types';

type TBurgerConstructorState = {
  ingredients: Array<TIngredient>;
  bun: TIngredient | null;
};

const initialState: TBurgerConstructorState = {
  ingredients: [],
  bun: null
};

export const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TIngredient & { index: number }>
    ) => {
      if (action.payload.type === 'bun') {
        state.bun = null;
      } else {
        state.ingredients.splice(action.payload.index, 1);
      }
    },
    changeIngredientsOrder: (state, action: PayloadAction<TMoveIngredient>) => {
      switch (action.payload.move) {
        case 'down':
          [
            state.ingredients[action.payload.index],
            state.ingredients[action.payload.index + 1]
          ] = [
            state.ingredients[action.payload.index + 1],
            state.ingredients[action.payload.index]
          ];
          return;
        case 'up':
          [
            state.ingredients[action.payload.index],
            state.ingredients[action.payload.index - 1]
          ] = [
            state.ingredients[action.payload.index - 1],
            state.ingredients[action.payload.index]
          ];
          return;
      }
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    burgerConstructorSelector: (state) => state
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  changeIngredientsOrder,
  resetConstructor
} = burgerConstructorSlice.actions;
