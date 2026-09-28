import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir peticiones desde el frontend Next.js
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Prefijo global de la API RESTful
  app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
  console.log(`\n======================================================`);
  console.log(`  🚀 Backend NestJS RESTful API corriendo en:`);
  console.log(`  👉 http://localhost:${PORT}/api/products`);
  console.log(`======================================================\n`);
}

bootstrap();
