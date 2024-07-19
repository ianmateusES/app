import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health Check' })
  @ApiResponse({
    status: 200,
    description: 'Checking service health',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok',
            },
            message: {
              type: 'string',
              example: 'Service is running',
            },
          },
        },
      },
    },
  })
  healthCheck() {
    return this.appService.healthCheck();
  }
}
