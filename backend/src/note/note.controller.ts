import { Body, Controller, Get, Post, Put, Delete, Patch, ParseIntPipe, Param } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto, EditNoteDto, ArchiveModifierNote } from './dto';
@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get('active')
  listActive() {
    return this.noteService.getActiveNotes();
  }

  @Get('archive')
  listArchived() {
    return this.noteService.getArchivedNotes();
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) noteId: number) {
    return this.noteService.deleteNote(noteId);
  }

  @Post()
  create(@Body() dto: CreateNoteDto) {
    return this.noteService.createNote(dto);
  }

  @Put(':id')
  edit(@Param('id', ParseIntPipe) noteId: number, @Body() dto: EditNoteDto) {
    return this.noteService.editNote(noteId, dto);
  }

  @Patch(':id')
  archiveModifier(@Param('id', ParseIntPipe) noteId: number, @Body() dto: ArchiveModifierNote) {
    return this.noteService.archiveModifierNote(noteId, dto);
  }
}
