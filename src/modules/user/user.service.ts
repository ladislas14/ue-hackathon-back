/* eslint-disable complexity */

import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { FindConditions, FindOneOptions } from 'typeorm';

import { UserEntity } from '../../entities/user.entity';
import { ConfigService } from '../../shared/services/config.service';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UserVerificationQueryDto } from '../auth/dto/UserVerificationQueryDto';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
    private readonly _logger = new Logger(UserService.name);

    constructor(
        private readonly _userRepository: UserRepository,
        private readonly _configService: ConfigService,
    ) {}

    /**
     * Find single user
     */
    findOne(
        conditions?: FindConditions<UserEntity>,
        options?: FindOneOptions<UserEntity>,
    ): Promise<UserEntity> {
        return this._userRepository.findOne(conditions, options);
    }
    async findByUsernameOrEmail(
        options: Partial<{ username: string; email: string }>,
    ): Promise<UserEntity | undefined> {
        const queryBuilder = this._userRepository.createQueryBuilder('user');

        if (options.email) {
            queryBuilder.orWhere('user.email = :email', {
                email: options.email,
            });
        }
        if (options.username) {
            queryBuilder.orWhere('user.username = :username', {
                username: options.username,
            });
        }

        return queryBuilder.getOne();
    }

    async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
        const preUser = this._userRepository.create({ ...userRegisterDto });

        const user = await this._userRepository.save(preUser);

        const jwtToken = jwt.sign(
            {
                userId: user.id,
            },
            this._configService.get('JWT_SECRET_KEY'),
            { expiresIn: this._configService.get('JWT_EXPIRATION_TIME') + 's' },
        );
        if (['development', 'staging'].includes(this._configService.nodeEnv)) {
            user.verificationToken = jwtToken;
        }

        return user;
    }

    async verifyUser(
        userVerificationQueryDto: UserVerificationQueryDto,
    ): Promise<UserEntity> {
        // eslint-disable-next-line unused-imports/no-unused-vars-ts
        const { userId, iat, exp } = <any>(
            jwt.verify(
                userVerificationQueryDto.token,
                this._configService.get('JWT_SECRET_KEY'),
            )
        );
        const user = await this._userRepository.findOne(userId);

        if (user) {
            user.isVerified = true;

            return this._userRepository.save(user);
        }
        return null;
    }
}
