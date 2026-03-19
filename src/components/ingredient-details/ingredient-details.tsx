import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { ingredientsSelector } from '../../services/slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector(ingredientsSelector);
  const [ingredientData, setIngredientData] = useState<TIngredient | null>(
    null
  );

  useEffect(() => {
    if (ingredients.length && id) {
      const ingredient = ingredients.find((item) => item._id === id);
      setIngredientData(ingredient || null);
    }
  }, [ingredients, id]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
