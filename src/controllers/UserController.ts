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
};

export default new UserConroller();
