import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserDto } from '../../dto/UserDto';
import { UserEntity } from '../../entities/user.entity';
import { EmailOrPasswordIncorrectException } from '../../exceptions/email-or-password-incorrect.exception';
import { UserNotVerifiedException } from '../../exceptions/user-not-verified.exception';
import { ContextService } from '../../providers/context.service';
import { UtilsService } from '../../providers/utils.service';
import { ConfigService } from '../../shared/services/config.service';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';

@Injectable()
export class AuthService {
    private static _authUserKey = 'user_key';
    private readonly _logger: Logger = new Logger(AuthService.name);

    constructor(
        private readonly _jwtService: JwtService,
        private readonly _configService: ConfigService,
        private readonly _userService: UserService,
        private readonly _userRepository: UserRepository,
    ) {}

    async createToken(user: UserEntity | UserDto): Promise<TokenPayloadDto> {
        return new TokenPayloadDto({
            expiresIn: this._configService.getNumber('JWT_EXPIRATION_TIME'),
            accessToken: await this._jwtService.signAsync({ id: user.id }),
        });
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
        const user = await this._userService.findOne(
            {
                email: userLoginDto.email,
            },
            { relations: ['profile'] },
        );

        const isPasswordValid = await UtilsService.validateHash(
            userLoginDto.password,
            user && user.password,
        );

        if (!user || !isPasswordValid) {
            throw new EmailOrPasswordIncorrectException();
        }

        if (user && !user.isVerified) {
            throw new UserNotVerifiedException();
        }
        return user;
    }

    async getUserWithProfile(user: UserEntity | UserDto): Promise<UserEntity> {
        return this._userRepository.findOne(
            { id: user.id },
            { relations: ['profile'] },
        );
    }

    static setAuthUser(user: UserEntity): void {
        ContextService.set(AuthService._authUserKey, user);
    }

    static getAuthUser(): UserEntity {
        return ContextService.get(AuthService._authUserKey);
    }
}
