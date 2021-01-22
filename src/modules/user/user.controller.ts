'use strict';

import {
    Body,
    Controller,
    Patch,
    UnprocessableEntityException,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserEntity } from '../../entities/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@UsePipes(
    new ValidationPipe({
        whitelist: true,
        transform: true,
        dismissDefaultMessages: false,
        errorHttpStatusCode: 422,
        exceptionFactory: (errors) => {
            throw new UnprocessableEntityException(errors);
        },
        validationError: {
            target: false,
            value: false,
        },
    }),
)
@ApiBearerAuth()
export class UserController {
    constructor(private _userService: UserService) {}

    @Patch()
    async updateUser(
        @Body() updateUserDto: UserEntity,
        @AuthUser() user: UserEntity,
    ): Promise<UserEntity> {
        return this._userService.updateUser(updateUserDto, user);
    }
}
