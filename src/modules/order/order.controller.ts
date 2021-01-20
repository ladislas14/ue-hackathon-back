import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { OrderEntity } from '../../entities/order.entity';
import { OrderService } from './order.service';

@Crud({
    model: {
        type: OrderEntity,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
})
@Controller('orders')
@ApiTags('Orders')
export class OrderController implements CrudController<OrderEntity> {
    constructor(public service: OrderService) {}
}
