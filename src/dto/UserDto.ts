'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../common/dto/AbstractDto';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends AbstractDto {
    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    onboarded: boolean;

    constructor(user: UserEntity) {
        super(user);
        this.email = user.email;
        this.onboarded = user.onboarded;
    }
}
