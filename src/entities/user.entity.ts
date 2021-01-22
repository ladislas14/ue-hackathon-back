import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../common/abstract.entity';
import { RoleType } from '../common/constants/role-type';
import { OrderEntity } from './order.entity';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
    @Column({ type: 'enum', enum: RoleType, default: RoleType.CLIENT })
    role: RoleType;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true })
    @Exclude()
    password: string;

    @Column({ nullable: false, default: false })
    onboarded: boolean;

    @Column({ nullable: true })
    @Exclude()
    expoPushToken: string;

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[];

    @Column({ nullable: true })
    cardNumber: number;
}
