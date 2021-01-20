import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from '../../entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    providers: [OrderService],
    controllers: [OrderController],
    exports: [OrderService],
    imports: [TypeOrmModule.forFeature([OrderEntity])],
})
export class OrderModule {}
