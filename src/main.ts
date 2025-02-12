import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './all-exception.filter';
// import { LogfService } from './logformat/logf.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. logformat global
  // const app = await NestFactory.create(AppModule, { bufferLogs: true });
  // app.useLogger(app.get(LogfService));

  // 3. filter and structure exception
  const { httpAdapter} = app.get(HttpAdapterHost)
  app.useGlobalFilters( new AllExceptionFilter(httpAdapter))

  // 1. validate request
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
