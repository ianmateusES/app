import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { FilterQuestionDto } from './dto/filter-question.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionsResponse } from './response/questions.response';
import { ApiErrorDecorator } from 'src/common/decorator/error.decorator';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get questions' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the questions' })
  @ApiErrorDecorator(
    HttpStatus.BAD_REQUEST,
    'Error generating SQL query | Error executing SQL query',
  )
  getQuestions(
    @Query() filterQuestionDto: FilterQuestionDto,
  ): Promise<QuestionsResponse> {
    return this.questionsService.getQuestions(filterQuestionDto);
  }
}
