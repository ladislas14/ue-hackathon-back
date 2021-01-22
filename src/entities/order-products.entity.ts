import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';
import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';

import { ToInt } from '../decorators/transforms.decorator';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity('order_products')
export class OrderProductsEntity {
    @Index()
    @Column()
    @PrimaryColumn()
    @ApiProperty()
    @IsUUID()
    productId!: string;

    @Index()
    @Column()
    @PrimaryColumn()
    orderId!: string;

    @ManyToOne(() => ProductEntity, {
        onDelete: 'CASCADE',
        eager: true,
    })
    product: ProductEntity;

    @ManyToOne(() => OrderEntity, (order) => order.orderProducts, {
        onDelete: 'CASCADE',
    })
    order: OrderEntity;

    @Column({ default: 1 })
    @ApiProperty()
    @IsNumber()
    @ToInt()
    quantity: number;
}
