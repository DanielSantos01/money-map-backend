import Joi from 'joi';

export const Category = Joi.object({
  name: Joi.string().required(),
  icon: Joi.string().required(),
  description: Joi.string().required(),
});

export const UpdateCategory = Joi.object({
  name: Joi.string(),
  icon: Joi.string(),
  description: Joi.string(),
});

export type CategoryType = {
  name: string;
  icon: string;
  description: string;
};
