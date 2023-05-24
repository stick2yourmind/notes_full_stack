import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArchiveModifierNote, CreateNoteDto, EditNoteDto } from './dto';

@Injectable({})
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async createNote(dto: CreateNoteDto) {
    const newNote = await this.prisma.note.create({
      data: {
        title: dto.title,
        description: dto.description,
        archived: false,
        // categories: { connect: [{ id: 1 }] },
      },
    });
    return newNote;
  }

  async deleteNote(noteId: number) {
    const deletedNote = await this.prisma.note.delete({
      where: {
        id: noteId,
      },
    });
    return deletedNote;
  }

  async editNote(noteId: number, dto: EditNoteDto) {
    const editNote = await this.prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title: dto.title,
        description: dto.description,
        archived: dto.archived,
        // categories: { connect: [{ id: 1 }] },
      },
    });
    return editNote;
  }

  async archiveModifierNote(noteId: number, dto: ArchiveModifierNote) {
    const editNote = await this.prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        archived: dto.archived,
      },
    });
    return editNote;
  }

  async getArchivedNotes() {
    const archivedNotes = await this.prisma.note.findMany({
      where: {
        archived: true,
      },
    });
    return archivedNotes;
  }

  async getActiveNotes() {
    const activeNotes = await this.prisma.note.findMany({
      where: {
        archived: false,
      },
    });
    return activeNotes;
  }
}
