import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private configService: ConfigService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID') || 'your-google-client-id',
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || 'your-google-client-secret',
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') || 'http://localhost:3000/api/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { emails, displayName } = profile;
        const email = emails[0].value;

        let user = await this.userRepository.findOne({
            where: { email },
            relations: ['roles'],
        });

        if (!user) {
            // Create new user from Google profile
            user = this.userRepository.create({
                email,
                password: Math.random().toString(36), // Random password, user won't use it
                isActive: true,
            });
            await this.userRepository.save(user);
        }

        done(null, user);
    }
}
