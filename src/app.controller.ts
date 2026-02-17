import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return '<h1>Salom Javohir, tabriklayman! Domen muvaffaqiyatli ulandi! 🚀</h1>';
  }
}