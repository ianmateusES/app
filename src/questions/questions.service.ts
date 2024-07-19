import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuestionDto } from './dto/filter-question.dto';
import { PrismaService } from '../prisma/prisma.service';
import { deserializeBigInt, serializeBigInt } from '../../utils';
import { Text2sqlService } from '@app/text2sql';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class QuestionsService {
  private schema: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly text2sqlService: Text2sqlService,
  ) {
    const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
    this.schema = fs.readFileSync(schemaPath, 'utf-8');
  }

  async getQuestions({ type_ia, question }: FilterQuestionDto) {
    let query: string;
    try {
      query = await this.text2sqlService.generateSql({
        provider_type: type_ia,
        question,
        schema: this.schema,
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error generating SQL query');
    }

    try {
      const result = await this.prismaService.$queryRawUnsafe(query);
      return {
        question,
        sql: query,
        result: deserializeBigInt(serializeBigInt(result)),
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error executing SQL query');
    }
  }
}
