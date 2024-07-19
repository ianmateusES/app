import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { TextToSqlProvider } from '../models/text2sql.provider';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAiProvider implements TextToSqlProvider {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: configService.get('OPENAI_API_KEY'),
    });
  }

  async generateSql(question: string, schema: string): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an assistant that translates questions in English into SQL queries. The database schema is as follows: ${schema}`,
          },
          { role: 'user', content: question },
        ],
        max_tokens: 150,
      });

      return response.choices[0].message.content
        .replace(/```sql\n|```/g, '')
        .trim();
    } catch (error) {
      console.error(error);
      throw new Error('Error generating SQL query');
    }
  }
}
