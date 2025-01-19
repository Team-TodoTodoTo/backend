import { Context } from 'koa';
import CategoryService from '../service/CategoryService';
import { CreateCategoryDto } from '../dto/CreateCategoryDto';

class CategoryController {
  static async createCategory(ctx: Context) {
    const { name } = ctx.request.body as CreateCategoryDto;
    const response = await CategoryService.createCategory({ name });
    ctx.status = 201;
    ctx.body = response;
  }

  static async updateCategory(ctx: Context) {
    const { categoryId } = ctx.params;
    const { name } = ctx.request.body as CreateCategoryDto;
    const response = await CategoryService.updateCategory(Number(categoryId), { name });
    ctx.status = 200;
    ctx.body = response;
  }

  static async deleteCategory(ctx: Context) {
    const { categoryId } = ctx.params;
    await CategoryService.deleteCategory(Number(categoryId));
    ctx.status = 204;
    ctx.body = { message: '카테고리가 삭제되었습니다.' };
  }

  static async getCategories(ctx: Context) {
    const response = await CategoryService.getCategories();
    ctx.status = 200;
    ctx.body = response;
  }
}

export default CategoryController;
