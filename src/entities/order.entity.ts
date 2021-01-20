import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../common/abstract.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

@Entity('order')
export class OrderEntity extends AbstractEntity {
    @ManyToOne(() => UserEntity, (user) => user.orders)
    user: UserEntity;

    @ManyToMany(() => ProductEntity)
    @JoinTable()
    products: ProductEntity[];
}
