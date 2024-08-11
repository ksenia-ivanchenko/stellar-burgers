import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { replace, useNavigate } from 'react-router-dom';
import { FC, useMemo } from 'react';
import { addOrder, clearOrderModalData } from '../../slices/orderSlice';
import { resetConstructor } from '../../slices/burgerConstructorSlice';
import { addNewOrder } from '../../slices/feedSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const { orderModalData, orderRequest } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const burgerConstructor = useSelector((state) => state.burgerConstructor);

  const constructorItems = {
    bun: burgerConstructor.bun,
    ingredients: burgerConstructor.ingredients
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) navigate('/login');

    if (constructorItems.bun && user) {
      const ids = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      dispatch(addOrder(ids)).then(() => {
        if (orderModalData) dispatch(addNewOrder(orderModalData));
      });
    }
  };
  const closeOrderModal = () => {
    dispatch(resetConstructor());
    dispatch(clearOrderModalData());
    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems?.ingredients
        ? constructorItems.ingredients
            .map((item) => item.price)
            .reduce((s, v) => s + v, 0)
        : 0),
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
