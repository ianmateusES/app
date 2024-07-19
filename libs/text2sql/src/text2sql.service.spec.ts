import { Test, TestingModule } from '@nestjs/testing';
import { Text2sqlService } from './text2sql.service';
import { TextToSqlProviderFactory } from './providers/text2sql.provider.factory';
import { OpenAiProvider, Text2sqlProvider } from './providers/implementations';
import { ConfigService } from '@nestjs/config';

describe('Text2sqlService', () => {
  let service: Text2sqlService;
  let providerFactory: TextToSqlProviderFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Text2sqlService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              switch (key) {
                case 'TEXT2SQL_API_KEY':
                  return 'test-api-key';
                case 'DB_TYPE':
                  return 'mysql';
                case 'OPENAI_API_KEY':
                  return 'test-openai';
                default:
                  return null;
              }
            }),
          },
        },
        TextToSqlProviderFactory,
        OpenAiProvider,
        Text2sqlProvider,
      ],
    }).compile();

    service = module.get<Text2sqlService>(Text2sqlService);
    providerFactory = module.get<TextToSqlProviderFactory>(
      TextToSqlProviderFactory,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateSql', () => {
    it('should call the provider to generate SQL', async () => {
      const provider = {
        generateSql: jest.fn().mockResolvedValue('SELECT * FROM table'),
      };
      jest.spyOn(providerFactory, 'getProvider').mockReturnValue(provider);

      const question = 'What is the capital of France?';
      const schema = 'tables';
      const result = await service.generateSql({
        provider_type: 'default',
        question,
        schema,
      });

      expect(providerFactory.getProvider).toHaveBeenCalledWith('default');
      expect(provider.generateSql).toHaveBeenCalledWith(question, schema);
      expect(result).toEqual('SELECT * FROM table');
    });
  });
});
