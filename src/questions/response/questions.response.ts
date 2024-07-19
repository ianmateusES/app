import { ApiProperty } from '@nestjs/swagger';

export class QuestionsResponse {
  @ApiProperty({
    example: 'What is the total number of orders?',
    description: 'The question to be answered',
  })
  question: string;

  @ApiProperty({
    example: 'SELECT COUNT(*) FROM orders',
    description: 'The generated SQL query',
  })
  sql: string;

  @ApiProperty({
    example: [
      {
        order_id: 1,
        total: 100,
      },
      {
        order_id: 2,
        total: 200,
      },
    ],
    description: 'The result of the SQL query',
  })
  result: any[];
}
