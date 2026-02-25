import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getConstructorBun,
  getConstructorIngredients,
  clearConstructor
} from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const bun = useSelector(getConstructorBun);
  const ingredients = useSelector(getConstructorIngredients);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: bun || {
      price: 0
    },
    ingredients: ingredients || []
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
