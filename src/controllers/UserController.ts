import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories';
import { UpdateUser } from '../DTOs';
import bcryptjs from 'bcryptjs';
class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        email,
        firstName,
        lastName,
        password,
        income,
        fixedGoal,
        variableGoal,
        futureGoal,
        profilePic,
        value,
      } = req.body;

      const userRepository = getCustomRepository(UserRepository);

      const userdata = {
        email,
        firstName,
        lastName,
        password,
        income,
        fixedGoal,
        variableGoal,
        futureGoal,
        profilePic,
        value,
      };

      const checkEmail = await userRepository.findByEmail(email);

      if (checkEmail) {
        next({
          status: 400,
          message: 'This email is already registered',
        });
      };

      if (userdata.password) {
        userdata.password = bcryptjs.hashSync(userdata.password, bcryptjs.genSaltSync(10));
      };

      const user = userRepository.create(userdata);
      await userRepository.save(user);

      res.locals = {
        status: 201,
        message: 'user created',
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userRepository = getCustomRepository(UserRepository);

      const user = await userRepository.findById(userId);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 201,
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userRepository = getCustomRepository(UserRepository);
      const userData = req.body;

      const { error } = UpdateUser.validate(userData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      if (userData.password) {
        userData.password = bcryptjs.hashSync(userData.password, bcryptjs.genSaltSync(10));
      };

      const patchedUser = await userRepository.patch(userId, userData);

      res.locals = {
        status: 201,
        message: 'user updated',
        data: patchedUser,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findById(userId);

      await userRepository.delete(userId);

      res.locals = {
        status: 201,
        message: 'user deleted',
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
