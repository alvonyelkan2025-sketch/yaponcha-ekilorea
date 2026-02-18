import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AppController {
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Bu yerda brauzer avtomatik Google login sahifasiga o'tadi
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    // Google-dan qaytganda foydalanuvchi ma'lumotlari 'req.user' ichida bo'ladi
    // Hozircha natijani ekranga chiqaramiz
    return res.json({
      message: 'Muvaffaqiyatli kirdingiz!',
      user: req.user,
      bonus: 'Sizga 500 token taqdim etildi!' 
    });
  }
}