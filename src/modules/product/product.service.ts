import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from '../../entities/product.entity';

@Injectable()
export class ProductService extends TypeOrmCrudService<ProductEntity> {
    constructor(
        @InjectRepository(ProductEntity) repo: Repository<ProductEntity>,
    ) {
        super(repo);
    }
}
