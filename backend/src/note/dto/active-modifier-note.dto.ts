import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ArchiveModifierNote {
  @IsBoolean()
  @IsNotEmpty()
  archived: boolean;
}
