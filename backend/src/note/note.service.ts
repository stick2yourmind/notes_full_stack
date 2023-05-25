import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArchiveModifierNote, CreateNoteDto, EditNoteDto } from './dto';

@Injectable({})
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async createNote(dto: CreateNoteDto) {
    try {
      const newNote = await this.prisma.note.create({
        data: {
          title: dto.title,
          description: dto.description,
          archived: false,
        },
      });
      return newNote;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async deleteNote(noteId: number) {
    try {
      const deletedNote = await this.prisma.note.delete({
        where: {
          id: noteId,
        },
      });
      return deletedNote;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async editNote(noteId: number, dto: EditNoteDto) {
    try {
      const categoriesArray = dto?.categories?.map((categoryId) => ({ id: categoryId })) || [];
      const editNote = await this.prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          title: dto.title,
          description: dto.description,
          archived: dto.archived,
          categories: { connect: categoriesArray },
        },
      });
      return editNote;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async archiveModifierNote(noteId: number, dto: ArchiveModifierNote) {
    try {
      const editNote = await this.prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          archived: dto.archived,
        },
      });
      return editNote;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async getArchivedNotes() {
    try {
      const archivedNotes = await this.prisma.note.findMany({
        where: {
          archived: true,
        },
        include: {
          categories: true,
        },
      });
      return archivedNotes;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async getActiveNotes() {
    try {
      const activeNotes = await this.prisma.note.findMany({
        where: {
          archived: false,
        },
        include: {
          categories: true,
        },
      });
      return activeNotes;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }
}
