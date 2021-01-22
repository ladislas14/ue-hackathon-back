import { Exclude, Type } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../common/abstract.entity';
import { OrderProductsEntity } from './order-products.entity';
import { UserEntity } from './user.entity';

@Entity('order')
export class OrderEntity extends AbstractEntity {
    @ManyToOne(() => UserEntity, (user) => user.orders)
    @Exclude()
    user: UserEntity;

    @Column()
    @Exclude()
    userId: string;

    @OneToMany(
        () => OrderProductsEntity,
        (orderProducts) => orderProducts.order,
        { cascade: true, eager: true },
    )
    @Type(() => OrderProductsEntity)
    orderProducts: OrderProductsEntity[];
}
