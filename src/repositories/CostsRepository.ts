import { EntityRepository, Repository } from 'typeorm';
import { Costs } from '../models';
import { CostsType } from '../DTOs';

type ErrorType = {
  severity?: string;
};

@EntityRepository(Costs)
export default class CostsRepository extends Repository<Costs> {
  public async findById(id: string): Promise<Costs | false | string | unknown> {
    try {
      const costs = await this.findOne(id, {
        relations: ['subcategory', 'user'],
      });

      if (!costs) {
        return false;
      }

      return costs;
    } catch (error) {
      return (error as ErrorType).severity || error;
    }
  }

  public async patch(
    id: string,
    costsData: CostsType,
  ): Promise<Costs | string | undefined | false | unknown> {
    try {
      await this.update(id, costsData);
      const UpdatedCost = await this.findOne(id, {
        relations: ['subcategory'],
      });

      return UpdatedCost;
    } catch (error) {
      return error;
    }
  }

  public async findByname(
    name: string,
  ): Promise<Costs | string | undefined | unknown | false> {
    try {
      const costName = await this.findOne({
        where: { name },
        relations: ['subcategory'],
      });

      if (!costName) {
        return false;
      }

      return costName;
    } catch (error) {
      return error;
    }
  }
}
