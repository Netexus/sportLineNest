import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from '../../api-keys/entities/api-key.entity';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
    constructor(
        @InjectRepository(ApiKey)
        private apiKeyRepository: Repository<ApiKey>,
    ) {
        super();
    }

    async validate(req: any): Promise<any> {
        const apiKey = req.headers['x-api-key'];

        if (!apiKey) {
            throw new UnauthorizedException('API key is missing');
        }

        const key = await this.apiKeyRepository.findOne({
            where: { key: apiKey, isActive: true },
        });

        if (!key) {
            throw new UnauthorizedException('Invalid API key');
        }

        return key;
    }
}
