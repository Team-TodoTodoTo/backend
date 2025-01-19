import CategoryRepository from '../repository/CategoryRepository';
import { CreateCategoryDto } from '../dto/CreateCategoryDto';

class CategoryService {
  static async createCategory(createCategoryDto: CreateCategoryDto) {
    return await CategoryRepository.createCategory(createCategoryDto);
  }

  static async updateCategory(id: number, updateCategoryDto: CreateCategoryDto) {
    return await CategoryRepository.updateCategory(id, updateCategoryDto);
  }

  static async deleteCategory(id: number) {
    await CategoryRepository.deleteCategory(id);
  }

  static async getCategories() {
    return CategoryRepository.getCategories();
  }
}

export default CategoryService;
