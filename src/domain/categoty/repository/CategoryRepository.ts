import database from '../../../global/database';
import { Category } from '../entity/Categoty';
import { CreateCategoryDto } from '../dto/CreateCategoryDto';

class CategoryRepository {
  static async createCategory({ title }: CreateCategoryDto, userId: number) {
    const [category] = await database(Category.tableName)
      .insert({
        title,
        userId: userId,
      })
      .returning('*');

    const [createdCategory] = await database(Category.tableName).where('id', category).select('*');
    return createdCategory;
  }

  static async updateCategory(id: number, { title }: CreateCategoryDto, userId: number) {
    await database(Category.tableName).where('id', id).update({
      title,
      userId: userId,
    });

    const [updatedCategory] = await database(Category.tableName).where('id', id).select('*');
    return updatedCategory;
  }

  static deleteCategory(id: number, userId: number) {
    return database(Category.tableName).where('id', id).andWhere('userId', userId).del();
  }

  static getCategories(userId: number) {
    return database(Category.tableName).where('userId', userId).select('*');
  }
}

export default CategoryRepository;
