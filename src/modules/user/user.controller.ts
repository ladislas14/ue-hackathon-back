'use strict';

import {
    Controller,
    UnprocessableEntityException,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
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
export class UserController {
    constructor(private _userService: UserService) {}
}
