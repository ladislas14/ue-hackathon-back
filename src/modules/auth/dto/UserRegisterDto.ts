'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UserRegisterDto {
    @IsString()
    @IsEmail({}, { message: 'email.invalid' })
    @IsNotEmpty()
    @ApiProperty()
    @Transform((email) => email.toLowerCase())
    readonly email: string;

    @IsString()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/,
        { message: 'Password is not enough strong' },
    )
    @ApiProperty({ minLength: 8 })
    readonly password: string;
}
