import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories";
import { getCustomRepository } from "typeorm";
import bcryptjs from 'bcryptjs';
import { User, UserType, UpdateUser } from "../DTOs";

class UserConroller {
  async create(req: Request, res: Response, next: NextFunction) {
      try {
          const { 
              email, 
              name, 
              password, 
              income, 
              fixedGoal, 
              variableGoal, 
              futureGoal,
          } = req.body;

          const userRepository = getCustomRepository(UserRepository);

          const userdata = {
              email, 
              name, 
              password, 
              income, 
              fixedGoal, 
              variableGoal, 
              futureGoal,
          };

          const checkEmail = await userRepository.findByEmail(email);

          if (checkEmail) {
              next({
                  status: 400,
                  message: 'This email is already registered'
              });
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
      };
  };

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
        };

        res.locals = {
          status: 201,
          data: user,
        };

        return next();
      } catch (error) {
          return next(error);
      };
  };

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId} = req.params;
      const userRepository = getCustomRepository(UserRepository);
      const userData = req.body;
      
      const {error} = UpdateUser.validate(userData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
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
    };
  };

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId} = req.params;
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
    };
  };
};

export default new UserConroller();
