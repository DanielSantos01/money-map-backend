import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { CostsRepository } from '../repositories';
import { CostsType, UpdateCosts } from "../DTOs";

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
};

export default new CostsController();
