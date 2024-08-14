import { Module } from '@nestjs/common';
import { FlowersModule } from './flowers/flowers.module';
import { ConfigModule } from '@nestjs/config';
import { MicroserviceModule } from './microservice/microservice.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { options } from './microservice/microservice.options';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { FlowersGraphqlModule } from './flowers-graphql/flowers-graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    FlowersModule, 
    FlowersGraphqlModule,
    MicroserviceModule,
    ClientsModule.register([
      {
        name: "ORDER_SERVICE",
        transport: Transport.TCP,
        options
      }
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  
}
