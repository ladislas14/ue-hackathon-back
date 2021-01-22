import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UnprocessableEntityException,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserDto } from '../../dto/UserDto';
import { UserEntity } from '../../entities/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { UserRegisterDto } from './dto/UserRegisterDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        public readonly userService: UserService,
        public readonly authService: AuthService,
    ) {}

    @Post('login')
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
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: LoginPayloadDto,
        description: 'User info with access token',
    })
    async userLogin(
        @Body() userLoginDto: UserLoginDto,
    ): Promise<LoginPayloadDto> {
        const user = await this.authService.validateUser(userLoginDto);

        const token = await this.authService.createToken(user);

        return new LoginPayloadDto(user, token);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'Successfully Registered',
    })
    async userRegister(
        @Body() userRegisterDto: UserRegisterDto,
    ): Promise<UserEntity> {
        return this.userService.createUser(userRegisterDto);
    }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserDto, description: 'current user info' })
    getCurrentUser(@AuthUser() user: UserEntity): Promise<UserEntity> {
        return this.authService.getUser(user);
    }
}
