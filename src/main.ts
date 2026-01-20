import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable global validation for all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // remove extra fields not in DTO
      forbidNonWhitelisted: true, // throw error if extra fields exist
      transform: true,        // automatically transform types
    }),
  );

  // Enable graceful shutdown hooks
  app.enableShutdownHooks();

 
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 App running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);

}
bootstrap();
