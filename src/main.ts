import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const port = 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: true });
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('NestanyAPI')
    .setVersion('1.0')
    .setDescription('Документация API')
    .addTag('API')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document);

  app.listen(port, () => { console.log(`server started at: ${port}`) })
}

start();