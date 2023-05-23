import { Controller, Get, Post, Put, Delete, Patch } from '@nestjs/common';
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

  @Delete()
  delete() {
    return { message: 'note deleted' };
  }

  @Post()
  create() {
    return { message: 'note created' };
  }

  @Put()
  edit() {
    return { message: 'note edited' };
  }

  @Patch()
  archive() {
    return { message: 'note archived' };
  }
}
