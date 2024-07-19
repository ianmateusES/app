import { Module } from '@nestjs/common';
import { Text2sqlService } from './text2sql.service';
import { TextToSqlProviderFactory } from './providers/text2sql.provider.factory';
import { OpenAiProvider, Text2sqlProvider } from './providers/implementations';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    Text2sqlService,
    TextToSqlProviderFactory,
    OpenAiProvider,
    Text2sqlProvider,
  ],
  exports: [Text2sqlService],
})
export class Text2sqlModule {}
