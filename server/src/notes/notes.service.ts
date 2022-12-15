import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  create(createNoteDto: CreateNoteDto) {
    const { note_name, note_description } = createNoteDto;
    return this.prisma.notes.create({
      data: {
        note_name,
        note_description,
      },
    });
  }

  findAll(): Promise<UpdateNoteDto[]> {
    return this.prisma.notes.findMany({});
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return this.prisma.notes.update({ where: { id }, data: updateNoteDto });
  }

  remove(id: number) {
    return this.prisma.notes.delete({ where: { id } });
  }
}
