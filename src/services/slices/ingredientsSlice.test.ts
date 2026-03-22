import ingredientsSlice, { getIngredients } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    price: 100,
    proteins: 10,
    fat: 5,
    carbohydrates: 30,
    calories: 200,
    image: '',
    image_large: '',
    image_mobile: ''
  },
  {
    _id: '2',
    name: 'Начинка',
    type: 'main',
    price: 50,
    proteins: 5,
    fat: 3,
    carbohydrates: 10,
    calories: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('должен возвращать initialState', () => {
    expect(ingredientsSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен установить loading=true при getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен загрузить ингредиенты при getIngredients.fulfilled', () => {
    const action = { type: getIngredients.fulfilled.type, payload: mockIngredients };
    const state = ingredientsSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('должен записать ошибку при getIngredients.rejected', () => {
    const action = { type: getIngredients.rejected.type, error: { message: 'Ошибка загрузки' } };
    const state = ingredientsSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});