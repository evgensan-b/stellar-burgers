import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  bunSelector,
  ingredientsSelector
} from '../../services/slices/constructorSlice';
import {
  orderBurger,
  orderRequestSelector,
  orderModalDataSelector,
  closeOrderModal
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector(bunSelector);
  const ingredients = useSelector(ingredientsSelector);
  const orderRequest = useSelector(orderRequestSelector);
  const orderModalData = useSelector(orderModalDataSelector);

  const constructorItems = {
    bun: bun || { price: 0 },
    ingredients: ingredients
  };

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    const isAuth = localStorage.getItem('refreshToken');
    if (!isAuth) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];
    dispatch(orderBurger(ingredientsIds));
  };

  const closeOrderModalHandler = () => {
    dispatch(closeOrderModal());
  };

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
      closeOrderModal={closeOrderModalHandler}
    />
  );
};
