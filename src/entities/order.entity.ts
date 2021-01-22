import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Exclude, Type } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../common/abstract.entity';
import { OrderProductsEntity } from './order-products.entity';
import { UserEntity } from './user.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

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

    @Column({ type: 'date' })
    @ApiProperty()
    @IsDateString({ groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [UPDATE] })
    date: Date;

    @Column({ nullable: true })
    @ApiPropertyOptional()
    @IsString({ groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [CREATE, UPDATE] })
    comment: string;
}
