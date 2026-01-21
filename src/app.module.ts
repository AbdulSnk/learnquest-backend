import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LearningModule } from './learning/learning.module';
import { ProgressModule } from './progress/progress.module';
import { GamificationModule } from './gamification/gamification.module';
import { ContributionsModule } from './contributions/contributions.module';
import { envValidationSchema } from './config/env.validation';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

const ENV = process.env.NODE_ENV || 'development';
@Module({
  imports: [

    //config module setup
    ConfigModule.forRoot({ //load configuration and validate env vars
      isGlobal: true,
      load: [configuration],
      validationSchema: envValidationSchema,      
      envFilePath: [`.env.${ENV}`, '.env'],
    }),

    //TypeOrm setup
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],// No entities yet
        synchronize: false,
        autoLoadEntities: true,
        
      }),
    }),


    UsersModule, LearningModule, ProgressModule, GamificationModule, ContributionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
