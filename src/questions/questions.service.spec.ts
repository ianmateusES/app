import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service';
import { FilterQuestionDto } from './dto/filter-question.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Text2sqlService } from '@app/text2sql';
import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');

describe('QuestionsService', () => {
  let service: QuestionsService;
  let prismaService: PrismaService;
  let text2sqlService: Text2sqlService;

  beforeEach(async () => {
    (fs.readFileSync as jest.Mock).mockReturnValue('schema content');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: PrismaService,
          useValue: {
            $queryRawUnsafe: jest.fn(),
          },
        },
        {
          provide: Text2sqlService,
          useValue: {
            generateSql: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
    prismaService = module.get<PrismaService>(PrismaService);
    text2sqlService = module.get<Text2sqlService>(Text2sqlService);
  });

  it('should initialize with schema content', () => {
    const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
    expect(fs.readFileSync).toHaveBeenCalledWith(schemaPath, 'utf-8');
    expect(service['schema']).toBe('schema content');
  });

  describe('getQuestions', () => {
    it('should generate SQL query and return the result', async () => {
      const filterQuestionDto: FilterQuestionDto = {
        type_ia: 'some_type',
        question: 'some_question',
      };
      const generatedSql = 'SELECT * FROM table WHERE condition';
      const queryResult = [{ id: 1, name: 'John' }];

      jest
        .spyOn(text2sqlService, 'generateSql')
        .mockResolvedValue(generatedSql);
      jest
        .spyOn(prismaService, '$queryRawUnsafe')
        .mockResolvedValue(queryResult);

      const result = await service.getQuestions(filterQuestionDto);

      expect(text2sqlService.generateSql).toHaveBeenCalledWith({
        provider_type: filterQuestionDto.type_ia,
        question: filterQuestionDto.question,
        schema: expect.any(String),
      });
      expect(prismaService.$queryRawUnsafe).toHaveBeenCalledWith(generatedSql);
      expect(result).toEqual({
        question: filterQuestionDto.question,
        sql: generatedSql,
        result: queryResult,
      });
    });

    it('should throw BadRequestException if SQL query execution fails', async () => {
      const filterQuestionDto: FilterQuestionDto = {
        type_ia: 'some_type',
        question: 'some_question',
      };
      const generatedSql = 'SELECT * FROM table WHERE condition';
      const error = new Error('SQL query execution failed');

      jest
        .spyOn(text2sqlService, 'generateSql')
        .mockResolvedValue(generatedSql);
      jest.spyOn(prismaService, '$queryRawUnsafe').mockRejectedValue(error);

      await expect(service.getQuestions(filterQuestionDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
