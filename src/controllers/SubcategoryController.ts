import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import { SubcategoryRepository } from '../repositories';
import { UpdateSubcategory, Subcategory } from '../DTOs';

class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const subcategoryData = req.body;

      const { error } = Subcategory.validate(subcategoryData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const subcategoryRepository = getCustomRepository(SubcategoryRepository);

      const subcategory = subcategoryRepository.create({
        ...subcategoryData,
        category: { id: subcategoryData.categoryId },
      });
      await subcategoryRepository.save(subcategory);

      res.locals = {
        status: 201,
        message: 'subcategory created',
        data: subcategory,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const subcategoryRepository = getCustomRepository(SubcategoryRepository);

      const subcategory = await subcategoryRepository.find({
        relations: ['category'],
      });

      res.locals = {
        status: 201,
        data: subcategory,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { subcategoryId } = req.params;
      const subcategoryRepository = getCustomRepository(SubcategoryRepository);

      const subcategory = await subcategoryRepository.findById(subcategoryId);

      if (!subcategory) {
        return next({
          status: 404,
          message: 'Subcategory not found',
        });
      }

      res.locals = {
        status: 201,
        data: subcategory,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const { subcategoryId } = req.params;
      const subcategoryData = req.body;

      const { error } = UpdateSubcategory.validate(subcategoryData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const subcategoryRepository = getCustomRepository(SubcategoryRepository);

      const patchedSubcategory = await subcategoryRepository.patch(
        subcategoryId,
        subcategoryData,
      );

      res.locals = {
        status: 201,
        message: 'subcategory updated',
        data: patchedSubcategory,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { subcategoryId } = req.params;

      const subcategoryRepository = getCustomRepository(SubcategoryRepository);

      const subcategory = await subcategoryRepository.findById(subcategoryId);

      if (!subcategory) {
        return next({
          status: 404,
          message: 'Subcategory not found',
        });
      }

      await subcategoryRepository.delete(subcategoryId);

      res.locals = {
        status: 201,
        message: 'Subcategory deleted',
        data: subcategory,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new CategoryController();
