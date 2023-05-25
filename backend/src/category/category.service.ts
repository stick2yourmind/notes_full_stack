import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const createCategory = await this.prisma.category.create({
        data: {
          title: createCategoryDto.title,
        },
      });
      return createCategory;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async delete(categoryId: number) {
    try {
      const deleteCategory = await this.prisma.category.delete({
        where: {
          id: categoryId,
        },
      });
      return deleteCategory;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async getAll() {
    try {
      const categories = await this.prisma.category.findMany();
      return categories;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async getAllRelatedNotes(categoryId: number) {
    try {
      const categories = await this.prisma.category.findMany({
        where: {
          id: categoryId,
        },
        include: {
          notes: true,
        },
      });
      return categories;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }
}
