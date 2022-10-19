import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../models';
import { CategoryType } from '../DTOs';

@EntityRepository(Category)
export default class CategoryRepository extends Repository<Category> {
  public async findById(
    id: string,
  ): Promise<Category | false | string | unknown> {
    try {
      const category = await this.findOne(id, { relations: ['subcategory'] });

      if (!category) {
        return false;
      }

      return category;
    } catch (error) {
      return error;
    }
  }

  public async patch(
    id: string,
    CategoryData: CategoryType,
  ): Promise<Category | string | undefined | unknown> {
    try {
      await this.update(id, CategoryData);
      const UpdatedCategory = await this.findOne(id, { relations: ['subcategory'] });

      return UpdatedCategory;
    } catch (error) {
      return error;
    }
  }
}
