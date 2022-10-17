import { EntityRepository, Repository } from 'typeorm';
import { Subcategory } from '../models';
import { CategoryType } from '../DTOs';

@EntityRepository(Subcategory)
export default class SubcategoryRepository extends Repository<Subcategory> {
  public async findById(
    id: string,
  ): Promise<Subcategory | false | string | unknown> {
    try {
      const subcategory = await this.findOne(id, { relations: ['category'] });

      if (!subcategory) {
        return false;
      }

      return subcategory;
    } catch (error) {
      return error;
    }
  }

  public async patch(
    id: string,
    CategoryData: CategoryType,
  ): Promise<Subcategory | string | undefined | unknown> {
    try {
      await this.update(id, CategoryData);
      const UpdatedSubcategory = await this.findOne(id, { relations: ['category'] });

      return UpdatedSubcategory;
    } catch (error) {
      return error;
    }
  }
}
