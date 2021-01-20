'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../../../entities/user.entity';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
    @ApiProperty({ type: UserEntity })
    user: UserEntity;

    @ApiProperty({ type: TokenPayloadDto })
    token: TokenPayloadDto;

    constructor(user: UserEntity, token: TokenPayloadDto) {
        this.user = user;
        this.token = token;
    }
}
