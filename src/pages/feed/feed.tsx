import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeeds,
  feedOrdersSelector,
  feedLoadingSelector
} from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(feedOrdersSelector);
  const loading = useSelector(feedLoadingSelector);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (loading || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
