import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { ProductEntity } from '../../entities/product.entity';
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
})
@Controller('products')
@ApiTags('Products')
export class ProductController implements CrudController<ProductEntity> {
    constructor(public service: ProductService) {}
}
