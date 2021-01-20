import { Column, Entity, PrimaryColumn } from 'typeorm';

import { AbstractCompositeEntity } from '../common/abstractComposite.entity';
import { RecurrenceUnitType } from '../common/constants/recurrence-type';

@Entity('product')
export class ProductEntity extends AbstractCompositeEntity {
    @Column()
    @PrimaryColumn()
    id: string;

    @Column()
    quantity: number;

    @Column()
    start: Date;

    @Column()
    end: Date;

    @Column({ default: false })
    recurrent: boolean;

    @Column({ type: 'enum', enum: RecurrenceUnitType, nullable: true })
    recurrenceUnit?: RecurrenceUnitType;

    @Column({ nullable: true })
    recurrenceValue?: number;
}
