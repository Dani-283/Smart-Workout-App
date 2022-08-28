import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(8080);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { join } from 'path';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import cookieParser from 'cookie-parser';
// import helmet from 'helmet';
// import { AppModule } from './app.module';

// const { PORT = 8080 } = process.env;

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   app.use(helmet());
//   app.use(cookieParser());
//   app.useStaticAssets(join(__dirname, 'public'), { prefix: '/assets' });
//   app.enableCors({
//     origin: ['http://localhost:3000'],
//     credentials: true,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   });
//   await app.listen(PORT);
// }
// bootstrap();
