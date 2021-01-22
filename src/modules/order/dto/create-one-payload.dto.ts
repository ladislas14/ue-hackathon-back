import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Type } from 'class-transformer';
import { IsDateString, IsOptional, ValidateNested } from 'class-validator';

import { OrderProductsEntity } from '../../../entities/order-products.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

export class CreateOnePayloadDto {
    @ApiProperty({ type: OrderProductsEntity, isArray: true })
    @ValidateNested()
    @Type(() => OrderProductsEntity)
    cart: OrderProductsEntity[];

    @ApiProperty()
    @IsDateString({ groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [UPDATE] })
    date: Date;
}
