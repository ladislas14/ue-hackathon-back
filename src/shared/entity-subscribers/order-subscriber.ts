import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';

import { OrderEntity } from '../../entities/order.entity';

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<OrderEntity> {
    listenTo(): typeof OrderEntity {
        return OrderEntity;
    }
}
