import { Injectable } from '@nestjs/common';
import { TextToSqlProviderFactory } from './providers/text2sql.provider.factory';
import { GenerateSqlText2sqlDto } from './dto/generateSql-text2sql.dto';

@Injectable()
export class Text2sqlService {
  constructor(private readonly providerFactory: TextToSqlProviderFactory) {}

  async generateSql({
    provider_type,
    question,
    schema,
  }: GenerateSqlText2sqlDto): Promise<any> {
    const provider = this.providerFactory.getProvider(provider_type);
    return provider.generateSql(question, schema);
  }
}
