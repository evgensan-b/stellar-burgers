import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getProfileOrders,
  profileOrdersSelector
} from '../../services/slices/profileOrderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(profileOrdersSelector);

  useEffect(() => {
    dispatch(getProfileOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
