'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { AbstractDto } from '../common/dto/AbstractDto';

@Exclude()
export class UserDto extends AbstractDto {
    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    onboarded: boolean;
}
