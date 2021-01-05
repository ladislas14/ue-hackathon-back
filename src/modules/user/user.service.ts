/* eslint-disable complexity */

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { Between, FindConditions, FindOneOptions } from 'typeorm';

import { UserEntity } from '../../entities/user.entity';
import { EmailOrPasswordIncorrectException } from '../../exceptions/email-or-password-incorrect.exception';
import { UserNotVerifiedException } from '../../exceptions/user-not-verified.exception';
import { UtilsService } from '../../providers/utils.service';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ConfigService } from '../../shared/services/config.service';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UserVerificationQueryDto } from '../auth/dto/UserVerificationQueryDto';
import { UserDeleteDto } from './dto/UserDeleteDto';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
    private readonly _logger = new Logger(UserService.name);

    constructor(
        private readonly _userRepository: UserRepository,
        private readonly _configService: ConfigService,
        private readonly _awsS3Service: AwsS3Service,
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
