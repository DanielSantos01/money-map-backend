import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { CostsRepository, UserRepository } from '../repositories';
import { CostsType, UpdateCosts } from "../DTOs";
import Costs from "@models/Costs";
import User from "@models/User";

class CostsController {
  async create(req: Request, res: Response, next: NextFunction) {
      try {
        const {
          userId,
          name,
          description,
          date,
          value,
          subCategoryId,
        } = req.body;

        const costsData = {
          userId,
          name,
          description,
          date,
          value,
          subCategoryId,
        };

        const costsRepository = getCustomRepository(CostsRepository);

        const costs = costsRepository.create(costsData);
        await costsRepository.save(costs);

        res.locals = {
          status: 201,
          data: costs,
          message: 'cost created!',
        };

        return next();
      } catch (error) {
          return next(error);
      };
  };

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { costsId } = req.params;
      const costsRepository = getCustomRepository(CostsRepository);

      const cost = await costsRepository.findById(costsId);

      if (!cost) {
        return next({
          status: 404,
          message: 'Cost not found',
        });
      };

      if (cost === 'ERROR') {
        return next({
          status: 400,
          message: 'Incorrect params',
        });
      };

      res.locals = {
        status: 201,
        data: cost,
      };

      return next();
    } catch (error) {
      return next(error);
    };
  };

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const costsRepository = getCustomRepository(CostsRepository);
      
      const costs = await costsRepository.findAll();

      res.locals = {
        status: 201,
        data: costs,
      };

      return next();
    } catch (error) {
      return next(error);
    };
  };

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const { costsId } = req.params;
      const costsData: CostsType = req.body;
      const costsRepository = getCustomRepository(CostsRepository);

      const { error } = UpdateCosts.validate(costsData);

      if (error) {
        return next({
          status: 400,
          message: error.details
        });
      };

      const updatedCost = await costsRepository.patch(costsId, costsData);

      console.log(updatedCost);

      res.locals = {
        status: 201,
        message: 'Cost patched!',
        data: updatedCost,
      };

      return next();
    } catch (error) {
      return next(error);
    };
  };

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { costsId } = req.params;
      const costsRepository = getCustomRepository(CostsRepository);

      const deletedCosts = await costsRepository.delete(costsId);

      res.locals = {
        status: 201,
        message: 'Cost deleted',
        deletedCosts,
      };

      return next();
    } catch (error) {
      return next({error});
    };
  };

  async addMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const { costId } = req.params;
      
      const { value } = req.body;
      const moneyData = { value };
      const moneyToAdd = Number(moneyData.value);
      
      const costsRepository = getCustomRepository(CostsRepository);
      const userRepository = getCustomRepository(UserRepository);

      const cost: Costs = await costsRepository.findById(costId);
      const userId = cost.userId;

      const user: User = await userRepository.findById(userId);
      const userMoney = Number(user.value);
      const newMoney = (userMoney + moneyToAdd);
      const newValue = {'value' : newMoney};

      const updatedUser = await userRepository.patch(userId, newValue);

      if (!updatedUser) {
        return next({
          status: 400,
          message: Error,
        });
      };

      res.locals = {
        status: 201,
        message: 'value added',
        data: updatedUser,
      };

      return next();
    } catch(error) {
      return next(error);
    };
  };

  async removeMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const { costId } = req.params;
      
      const { value } = req.body;
      const moneyData = { value };
      const moneyToRemove = Number(moneyData.value);
      
      const costsRepository = getCustomRepository(CostsRepository);
      const userRepository = getCustomRepository(UserRepository);

      const cost: Costs = await costsRepository.findById(costId);
      const userId = cost.userId;

      const user: User = await userRepository.findById(userId);
      const userMoney = Number(user.value);
      const newMoney = (userMoney - moneyToRemove);

      if (newMoney < 0) {
        return next({
          status: 400,
          message: 'this value can not be removed because it will be less than zero'
        });
      };

      if (newMoney === 0) {
        res.locals = {
          status: 201,
          message: 'valeu removed, your current cash is zero'
        };
      };

      const newValue = {'value' : newMoney};

      const updatedUser = await userRepository.patch(userId, newValue);

      if (!updatedUser) {
        return next({
          status: 400,
          message: Error,
        });
      };

      res.locals = {
        status: 201,
        message: 'value removed',
        data: updatedUser,
      };

      return next();
    } catch(error) {
      return next(error);
    };
  };
};

export default new CostsController();
