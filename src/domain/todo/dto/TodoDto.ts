export interface CreateTodoDto {
  todo: string;
  categoryId: number;
  date: string;
}

export interface UpdateTodoDto extends CreateTodoDto {}
