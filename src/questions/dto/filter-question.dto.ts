import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Providers } from '@app/text2sql';

export class FilterQuestionDto {
  @ApiProperty({
    description: 'Analysis question',
    example:
      'Quais são os produtos mais populares entre os clientes corporativos?',
  })
  @IsString()
  question: string;

  @ApiProperty({
    description: 'Type of ia',
    enum: Providers,
    example: Providers.OPENAI,
  })
  @IsOptional()
  @IsEnum(Providers)
  type_ia?: string;
}
