import Joi from 'joi';

export const User = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  income: Joi.number().required(),
  fixedGoal: Joi.number().required(),
  variableGoal: Joi.number().required(),
  futureGoal: Joi.number().required(),
});

export const UpdateUser = Joi.object({
  email: Joi.string(),
  name: Joi.string(),
  password: Joi.string(),
  income: Joi.number(),
  fixedGoal: Joi.number(),
  variableGoal: Joi.number(),
  futureGoal: Joi.number(),
});

export type UserType = {
  email: string;
  name: string;
  password?: string;
  income?: number;
  fixedGoal?: number;
  variableGoal?: number;
  futureGoal?: number;
};
