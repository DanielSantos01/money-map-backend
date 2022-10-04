import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { CostsRepository } from '../repositories';
import { UpdateCosts } from "../DTOs";

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
          return next(error.details);
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
      return next(error.details);
    };
  };
};

export default new CostsController();
