import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoryService.delete(categoryId);
  }

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Get(':id/notes')
  getAllRelatedNotes(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoryService.getAllRelatedNotes(categoryId);
  }
}
