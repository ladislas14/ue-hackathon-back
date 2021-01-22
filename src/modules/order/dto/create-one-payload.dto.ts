import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { OrderProductsEntity } from '../../../entities/order-products.entity';

export class CreateOnePayloadDto {
    @ApiProperty({ type: OrderProductsEntity, isArray: true })
    @ValidateNested()
    @Type(() => OrderProductsEntity)
    cart: OrderProductsEntity[];
}
