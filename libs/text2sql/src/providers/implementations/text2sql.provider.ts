import { Injectable } from '@nestjs/common';
import { TextToSqlProvider } from '../models/text2sql.provider';
import { ConfigService } from '@nestjs/config';
import axios, { Axios } from 'axios';

@Injectable()
export class Text2sqlProvider implements TextToSqlProvider {
  private text2sql: Axios;
  private type: string;

  constructor(private configService: ConfigService) {
    this.text2sql = axios.create({
      baseURL: 'https://www.text2sql.ai/api/sql',
      headers: {
        Authorization: `Bearer ${configService.get('TEXT2SQL_API_KEY')}`,
      },
    });

    this.type = configService.get('DB_TYPE');
  }

  async generateSql(question: string, schema: string): Promise<any> {
    try {
      const response = await this.text2sql.post('/generate', {
        prompt: question,
        type: this.type,
        schema,
      });

      return response.data.output;
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }
}
