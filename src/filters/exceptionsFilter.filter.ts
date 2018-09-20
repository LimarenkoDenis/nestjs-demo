import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const baseError: any = {
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (!(exception instanceof HttpException)) {
      return response
      .status(500)
      .json({
        ...baseError,
        statusCode: 500,
        error: 'Unhendled error',
      });
    }

    const status = exception.getStatus();

    return response
      .status(status)
      .json({
        ...baseError,
        statusCode: status,
        error: exception.message,
      });
  }
}