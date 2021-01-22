import {
    Body,
    Controller,
    UnprocessableEntityException,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController, Override } from '@nestjsx/crud';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { OrderEntity } from '../../entities/order.entity';
import { UserEntity } from '../../entities/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { CreateOnePayloadDto } from './dto/create-one-payload.dto';
import { OrderService } from './order.service';

@Crud({
    model: {
        type: OrderEntity,
    },
    dto: {
        create: CreateOnePayloadDto,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        join: {
            products: {
                eager: true,
            },
        },
    },
    routes: {
        exclude: ['replaceOneBase', 'createManyBase'],
        createOneBase: {
            interceptors: [AuthUserInterceptor],
            decorators: [UseGuards(AuthGuard, RolesGuard), ApiBearerAuth()],
        },
        updateOneBase: {
            interceptors: [AuthUserInterceptor],
            decorators: [UseGuards(AuthGuard, RolesGuard), ApiBearerAuth()],
        },
        deleteOneBase: {
            interceptors: [AuthUserInterceptor],
            decorators: [UseGuards(AuthGuard, RolesGuard), ApiBearerAuth()],
        },
    },
    validation: {
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
    },
})
@CrudAuth({
    property: 'user',
    filter: (user: UserEntity) => ({
        userId: user.id,
    }),
})
@Controller('orders')
@ApiTags('Orders')
export class OrderController implements CrudController<OrderEntity> {
    constructor(public service: OrderService) {}

    get base(): OrderController {
        return this;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Override('createOneBase')
    @UseInterceptors(AuthUserInterceptor)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    async createOne(
        @Body() dto: CreateOnePayloadDto,
        @AuthUser() user: UserEntity,
    ): Promise<OrderEntity> {
        return this.service.createOneOverride({ dto, user });
    }
}
