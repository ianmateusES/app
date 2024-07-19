import { Injectable } from '@nestjs/common';
import { OpenAiProvider } from './implementations/openai.provider';
import { TextToSqlProvider } from './models/text2sql.provider';
import { Providers } from './enum';
import { Text2sqlProvider } from './implementations/text2sql.provider';

@Injectable()
export class TextToSqlProviderFactory {
  constructor(
    private readonly openAiProvider: OpenAiProvider,
    private readonly text2sqlProvider: Text2sqlProvider,
  ) {}

  getProvider(providerType: string): TextToSqlProvider {
    switch (providerType) {
      case Providers.OPENAI:
        return this.openAiProvider;
      case Providers.TEXT2SQL:
        return this.text2sqlProvider;
      default:
        return this.openAiProvider;
    }
  }
}
