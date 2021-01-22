import {
    Controller,
    UnprocessableEntityException,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    Crud,
    CrudController,
    CrudRequest,
    Override,
    ParsedRequest,
} from '@nestjsx/crud';

import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { ProductEntity } from '../../entities/product.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { ProductService } from './product.service';

@Crud({
    model: {
        type: ProductEntity,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    routes: {
        exclude: ['replaceOneBase', 'createManyBase'],
        createOneBase: {
            interceptors: [AuthUserInterceptor],
            decorators: [
                UseGuards(AuthGuard, RolesGuard),
                ApiBearerAuth(),
                Roles(RoleType.STAFF),
            ],
        },
        updateOneBase: {
            interceptors: [AuthUserInterceptor],
            decorators: [
                UseGuards(AuthGuard, RolesGuard),
                ApiBearerAuth(),
                Roles(RoleType.STAFF),
            ],
        },
        deleteOneBase: {
            interceptors: [AuthUserInterceptor],
            decorators: [
                UseGuards(AuthGuard, RolesGuard),
                ApiBearerAuth(),
                Roles(RoleType.STAFF),
            ],
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
@Controller('products')
@ApiTags('Products')
export class ProductController implements CrudController<ProductEntity> {
    constructor(public service: ProductService) {}

    get base(): CrudController<ProductEntity> {
        return this;
    }

    @Override()
    async getMany(@ParsedRequest() req: CrudRequest): Promise<any> {
        const products = await this.base.getManyBase(req);

        return { products };
    }
}
