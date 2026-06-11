import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })

  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  
  

  app.enableCors();

  // Configuracion de swagger docs
  const config = new DocumentBuilder()
  .setTitle('Task Manager API')
  .setDescription('Gestion de tareas')
  .setVersion('1.0')
  .addTag('Tasks')  // Agrupar los endpoints bajo la etiqueta 'Tasks'
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//! git add.
//! git commit -m "fix: Estructura de tareas y listado disponible"
//! git push

//? npm i --save @nestjs/swagger