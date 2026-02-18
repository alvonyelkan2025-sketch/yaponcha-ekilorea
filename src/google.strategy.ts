import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.CALLBACK_URL as string,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const email = emails[0].value;

    // 1. Bazadan foydalanuvchini qidiramiz
    let user = await this.userRepository.findOne({ where: { email } });

    // 2. Agar yo'q bo'lsa, yangi yaratamiz
    if (!user) {
      user = this.userRepository.create({
        email,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        balance: 500, // Birinchi kirishda 500 token
      });
      await this.userRepository.save(user);
    }

    done(null, user);
  }
}