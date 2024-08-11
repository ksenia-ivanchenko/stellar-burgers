import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const { feedData, loading } = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const orders = feedData.orders;

  if (loading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
