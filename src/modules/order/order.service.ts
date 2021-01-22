import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from '../../entities/order.entity';
import { UserEntity } from '../../entities/user.entity';
import { CreateOnePayloadDto } from './dto/create-one-payload.dto';

@Injectable()
export class OrderService extends TypeOrmCrudService<OrderEntity> {
    constructor(@InjectRepository(OrderEntity) repo: Repository<OrderEntity>) {
        super(repo);
    }

    async createOneOverride({
        dto,
        user,
    }: {
        dto: CreateOnePayloadDto;
        user: UserEntity;
    }): Promise<OrderEntity> {
        const order = this.repo.create();
        order.user = user;
        order.orderProducts = dto.cart;

        return this.repo.save(order);
    }
}
