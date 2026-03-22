import constructorSlice, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} from './constructorSlice';
import { TIngredient } from '../../utils/types';

const mockBun: TIngredient = {
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
};

const mockMain: TIngredient = {
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
};

describe('constructorSlice', () => {
  const initialState = constructorSlice(undefined, { type: 'unknown' });

  it('должен возвращать initialState', () => {
    expect(constructorSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен добавлять булку', () => {
    const action = addIngredient({ ...mockBun, id: 'test-id' });
    const state = constructorSlice(initialState, action);
    expect(state.bun).toEqual({ ...mockBun, id: 'test-id' });
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен добавлять начинку', () => {
    const action = addIngredient({ ...mockMain, id: 'test-id' });
    const state = constructorSlice(initialState, action);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({ ...mockMain, id: 'test-id' });
  });

  it('должен удалять ингредиент по id', () => {
    const addAction = addIngredient({ ...mockMain, id: 'test-id' });
    let state = constructorSlice(initialState, addAction);
    
    const removeAction = removeIngredient('test-id');
    state = constructorSlice(state, removeAction);
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен перемещать ингредиенты', () => {
    const ing1 = addIngredient({ ...mockMain, id: 'id1' });
    let state = constructorSlice(initialState, ing1);
    const ing2 = addIngredient({ ...mockMain, _id: '3', name: 'Начинка2', id: 'id2' });
    state = constructorSlice(state, ing2);
    
    const moveAction = moveIngredient({ from: 0, to: 1 });
    state = constructorSlice(state, moveAction);
    expect(state.ingredients[1]._id).toBe('2');
  });

  it('должен сбрасывать конструктор', () => {
    const addBun = addIngredient({ ...mockBun, id: 'bun-id' });
    let state = constructorSlice(initialState, addBun);
    const addMain = addIngredient({ ...mockMain, id: 'main-id' });
    state = constructorSlice(state, addMain);
    
    const resetAction = resetConstructor();
    state = constructorSlice(state, resetAction);
    expect(state).toEqual(initialState);
  });
});