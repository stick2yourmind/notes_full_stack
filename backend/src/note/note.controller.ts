import { Controller, Get, Post, Put, Delete, Patch, ParseIntPipe, Param } from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get('active')
  listActive() {
    return { message: 'active notes' };
  }

  @Get('archive')
  listArchived() {
    return { message: 'archived notes' };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) noteId: number) {
    return { message: `note deleted: ${noteId}` };
  }

  @Post()
  create() {
    return { message: 'note created' };
  }

  @Put(':id')
  edit(@Param('id', ParseIntPipe) noteId: number) {
    return { message: `note edited: ${noteId}` };
  }

  @Patch(':id')
  archive(@Param('id', ParseIntPipe) noteId: number) {
    return { message: `note archived: ${noteId}` };
  }
}
