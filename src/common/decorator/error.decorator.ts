import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorDto } from '../dto/error.dto';

export function ApiErrorDecorator(
  statusCode: HttpStatus,
  message?: string,
  description?: string,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      ...options,
      status: statusCode,
      description: description,
      schema: {
        default: {
          message: message,
          statusCode: statusCode,
          error: HttpStatus[statusCode].split('_').join(' '),
        },
        type: getSchemaPath(ErrorDto),
      },
    }),
  );
}
