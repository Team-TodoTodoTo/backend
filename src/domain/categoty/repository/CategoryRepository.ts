import database from '../../../global/database';
import { Category } from '../entity/Categoty';
import { CreateCategoryDto } from '../dto/CreateCategoryDto';

class CategoryRepository {
  static async createCategory({ name }: CreateCategoryDto) {
    const category = await database(Category.tableName).insert({
      name,
    });

    const [createdCategory] = await database(Category.tableName).where('id', category).select('*');
    return createdCategory;
  }

  static async updateCategory(id: number, { name }: CreateCategoryDto) {
    await database(Category.tableName).where('id', id).update({
      name,
    });

    const [updatedCategory] = await database(Category.tableName).where('id', id).select('*');
    return updatedCategory;
  }

  static deleteCategory(id: number) {
    return database(Category.tableName).where('id', id).del();
  }

  static getCategories() {
    return database(Category.tableName).select('*').orderBy('title', 'asc');
  }
}

export default CategoryRepository;
