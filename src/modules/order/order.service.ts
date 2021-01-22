import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from '../../entities/order.entity';
import { ProductEntity } from '../../entities/product.entity';
import { UserEntity } from '../../entities/user.entity';
import { CreateOnePayloadDto } from './dto/create-one-payload.dto';

@Injectable()
export class OrderService extends TypeOrmCrudService<OrderEntity> {
    protected _productRepository: Repository<ProductEntity>;

    constructor(
        @InjectRepository(OrderEntity) repo: Repository<OrderEntity>,
        @InjectRepository(ProductEntity)
        productRepository: Repository<ProductEntity>,
    ) {
        super(repo);
        this._productRepository = productRepository;
    }

    async createOneOverride({
        dto,
        user,
    }: {
        dto: CreateOnePayloadDto;
        user: UserEntity;
    }): Promise<OrderEntity> {
        const preOrder = this.repo.create();
        preOrder.user = user;
        preOrder.orderProducts = dto.cart;
        preOrder.date = dto.date;

        const order = await this.repo.save(preOrder);

        const ids = order.orderProducts.map(
            (orderProduct) => orderProduct.productId,
        );
        const products = await this._productRepository.findByIds(ids);

        const promises = [];
        for (const product of products) {
            product.remainingQuantity = product.remainingQuantity - 1;
            promises.push(this._productRepository.save(product));
        }

        await Promise.all(promises);

        return order;
    }
}
