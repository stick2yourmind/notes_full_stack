import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateNoteDto } from './create-note.dto';

export class EditNoteDto extends CreateNoteDto {
  @IsBoolean()
  @IsNotEmpty()
  archived: boolean;
}
