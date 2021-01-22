import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../common/abstract.entity';
import { RoleType } from '../common/constants/role-type';
import { OrderEntity } from './order.entity';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
    @Column({ type: 'enum', enum: RoleType, default: RoleType.CLIENT })
    @ApiPropertyOptional({ type: 'enum', enum: RoleType })
    @IsOptional()
    @IsEnum(RoleType)
    role: RoleType;

    @Column({ unique: true, nullable: true })
    @ApiPropertyOptional()
    @IsOptional()
    email: string;

    @Column({ nullable: true })
    @Exclude()
    @ApiPropertyOptional()
    @IsOptional()
    password: string;

    @Column({ nullable: false, default: false })
    @ApiPropertyOptional()
    @IsOptional()
    onboarded: boolean;

    @Column({ nullable: true })
    @Exclude()
    @ApiPropertyOptional()
    @IsOptional()
    expoPushToken: string;

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[];

    @Column({ nullable: true })
    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    @Transform(parseInt)
    cardCode: number;

    @Column({ nullable: true })
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    firstName: string;

    @Column({ nullable: true })
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    lastName: string;
}
