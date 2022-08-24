import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as bodyParser from 'body-parser';
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    cors: true,
  });
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  const appOptions = new DocumentBuilder()
      .setTitle('AWS One-stop Workshop API')
      .setDescription('for Test(RDS, S3)')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
  const appDocument = SwaggerModule.createDocument(app, appOptions);
  SwaggerModule.setup('api', app, appDocument);

  await app.listen(process.env.PORT || '3000');
}

bootstrap();
