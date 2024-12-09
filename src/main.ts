import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Видаляє всі властивості, які не мають декораторів
      forbidNonWhitelisted: true, // Забороняє властивості, які не визначені в DTO
      transform: true, // Автоматично перетворює типи
      validateCustomDecorators: true,
      strictGroups: true,
      dismissDefaultMessages: false,
      skipMissingProperties: false, // Важливо! Це змусить валідатор перевіряти всі властивості
      errorHttpStatusCode: 422, // Можна змінити статус код помилки валідації
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('First Nest Server')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
