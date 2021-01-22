import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';

import { ProductEntity } from '../../entities/product.entity';

@EventSubscriber()
export class ProductSubscriber
    implements EntitySubscriberInterface<ProductEntity> {
    listenTo(): typeof ProductEntity {
        return ProductEntity;
    }

    beforeInsert(event: InsertEvent<ProductEntity>): void {
        if (event.entity.quantity) {
            event.entity.remainingQuantity = event.entity.quantity;
        }
    }
}
