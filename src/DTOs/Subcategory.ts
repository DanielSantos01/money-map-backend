import Joi from 'joi';
import { CategoryType } from './Category';

export const Subcategory = Joi.object({
  name: Joi.string().required(),
  icon: Joi.string().required(),
  description: Joi.string().required(),
  categoryId: Joi.string().required(),
});

export const UpdateSubcategory = Joi.object({
  name: Joi.string(),
  icon: Joi.string(),
  description: Joi.string(),
  categoryId: Joi.string(),
});

export type SubcategoryType = {
  name: string;
  icon: string;
  description: string;
  category: CategoryType;
};
