import User from '@models/User';
import Joi from 'joi';
import { SubcategoryType } from './Subcategory';

export const Costs = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  value: Joi.number().required(),
  subCategoryId: Joi.string().required(),
});

export const UpdateCosts = Joi.object({
  userId: Joi.string(),
  name: Joi.string(),
  description: Joi.string(),
  date: Joi.date(),
  value: Joi.number(),
  subCategoryId: Joi.string(),
});

export type CostsType = {
    user: User;
    subcategory: SubcategoryType;
    description: string;
    name: string;
    date: Date;
    value: number;
};
