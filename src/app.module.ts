import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Buni qo'shing
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './google.strategy'; // Buni qo'shing

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // isGlobal: true qulaylik yaratadi
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}