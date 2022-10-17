import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import { CategoryRepository } from '../repositories';
import { UpdateCategory, Category } from '../DTOs';

class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryData = req.body;

      const { error } = Category.validate(categoryData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const categoryRepository = getCustomRepository(CategoryRepository);

      const category = categoryRepository.create(categoryData);
      await categoryRepository.save(category);

      res.locals = {
        status: 201,
        message: 'category created',
        data: category,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryRepository = getCustomRepository(CategoryRepository);

      const category = await categoryRepository.find();

      res.locals = {
        status: 201,
        data: category,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const categoryRepository = getCustomRepository(CategoryRepository);

      const category = await categoryRepository.findById(categoryId);

      if (!category) {
        return next({
          status: 404,
          message: 'Category not found',
        });
      }

      res.locals = {
        status: 201,
        data: category,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const categoryData = req.body;

      const { error } = UpdateCategory.validate(categoryData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const categoryRepository = getCustomRepository(CategoryRepository);

      const patchedCategory = await categoryRepository.patch(
        categoryId,
        categoryData,
      );

      res.locals = {
        status: 201,
        message: 'category updated',
        data: patchedCategory,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;

      const categoryRepository = getCustomRepository(CategoryRepository);

      const category = await categoryRepository.findById(categoryId);

      if (!category) {
        return next({
          status: 404,
          message: 'Category not found',
        });
      }

      await categoryRepository.delete(categoryId);

      res.locals = {
        status: 201,
        message: 'category deleted',
        data: category,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new CategoryController();
