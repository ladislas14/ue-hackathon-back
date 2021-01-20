import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from '../../entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    providers: [ProductService],
    exports: [ProductService],
    controllers: [ProductController],
})
export class ProductModule {}
