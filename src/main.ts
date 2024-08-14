import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { options } from './microservice/microservice.options';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Flowers API')
    .setDescription('The flowers API description')
    .setVersion('1.0')
    .addTag('flowers')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  const microserviceApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, 
    {
      transport: Transport.TCP,
      options
    }
  )

  await microserviceApp.listen()
  console.log("Microservice has been started")
    
}
bootstrap();
