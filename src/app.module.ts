import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './google.strategy';
import { User } from './user.entity';

@Module({
  imports: [
    // .env faylini tizimga ulash
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MySQL bazasiga ulanish sozlamalari
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true, // Bazada jadvallarni avtomatik yaratadi
    }),
    // User jadvalini joriy modulda ishlatish uchun
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}