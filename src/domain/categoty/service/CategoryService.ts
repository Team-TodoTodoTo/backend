import CategoryRepository from '../repository/CategoryRepository';
import { CreateCategoryDto } from '../dto/CreateCategoryDto';

class CategoryService {
  static async createCategory(createCategoryDto: CreateCategoryDto, userId: number) {
    return await CategoryRepository.createCategory(createCategoryDto, userId);
  }

  static async updateCategory(id: number, updateCategoryDto: CreateCategoryDto, userId: number) {
    return await CategoryRepository.updateCategory(id, updateCategoryDto, userId);
  }

  static async deleteCategory(id: number, userId: number) {
    await CategoryRepository.deleteCategory(id, userId);
  }

  static async getCategories(userId: number) {
    return CategoryRepository.getCategories(userId);
  }
}

export default CategoryService;
