import { TIngredient } from '../../utils/types';
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: (TIngredient & {
    type: 'sauce' | 'main';
    id: string;
  })[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

type TIngredientWithKey = TIngredient & { id?: string };

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredientWithKey>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else if (action.payload.id) {
          state.ingredients.push({
            ...action.payload,
            type: action.payload.type as 'sauce' | 'main',
            id: action.payload.id
          });
        }
      },
      prepare: (ingredient: TIngredient) => {
        if (ingredient.type === 'bun') {
          return { payload: ingredient };
        } else {
          const id = nanoid();
          return { payload: { ...ingredient, id } };
        }
      }
    },

    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const [moved] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, moved);
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export const getConstructorBun = (state: { constructor: TConstructorState }) =>
  state.constructor.bun;

export const getConstructorIngredients = (state: {
  constructor: TConstructorState;
}) => state.constructor.ingredients;

export default constructorSlice.reducer;
