import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { ingredients } = useSelector((state) => state.ingredients);
  const { id } = useParams();
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredients) {
    return <Preloader />;
  }

  if (ingredientData) {
    return <IngredientDetailsUI ingredientData={ingredientData} />;
  }
};
