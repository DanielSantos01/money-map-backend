import { EntityRepository, Repository } from 'typeorm';

import { User } from '../models';
import { UserType } from '../DTOs';

type ErrorType = {
  severity?: string;
};

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findById(id: string): Promise<User | false | string | unknown> {
    try {
      const user = await this.findOne(id);

      if (!user) {
        return false;
      }

      return user;
    } catch (error) {
      return (error as ErrorType).severity || error;
    }
  }

  public async patch(
    id: string,
    userData: UserType,
  ): Promise<User | string | undefined | unknown> {
    try {
      await this.update(id, userData);
      const UpdatedUser = await this.findOne(id);

      return UpdatedUser;
    } catch (error) {
      return error;
    }
  }

  public async findByEmail(
    email: string,
  ): Promise<User | false | string | unknown> {
    try {
      const user = await this.findOne({ where: { email } });

      if (!user) {
        return false;
      }

      return user;
    } catch (error) {
      return (error as ErrorType).severity || error;
    }
  }
}
