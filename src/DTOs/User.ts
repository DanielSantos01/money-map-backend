import Joi from 'joi';

export const User = Joi.object({
  email: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  income: Joi.number().required(),
  fixedGoal: Joi.number().required(),
  variableGoal: Joi.number().required(),
  futureGoal: Joi.number().required(),
  profilePic: Joi.string().required(),
});

export const UpdateUser = Joi.object({
  email: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  password: Joi.string(),
  income: Joi.number(),
  fixedGoal: Joi.number(),
  variableGoal: Joi.number(),
  futureGoal: Joi.number(),
  profilePic: Joi.string(),
});

export type UserType = {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  income?: number;
  fixedGoal?: number;
  variableGoal?: number;
  futureGoal?: number;
  profilePic?: string;
};
