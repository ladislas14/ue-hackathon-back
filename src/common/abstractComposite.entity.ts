'use strict';

import { Exclude } from 'class-transformer';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractCompositeEntity {
    @CreateDateColumn({
        type: 'timestamp without time zone',
        name: 'created_at',
    })
    @Exclude()
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp without time zone',
        name: 'updated_at',
    })
    @Exclude()
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'timestamp without time zone',
        name: 'deleted_at',
    })
    @Exclude()
    deletedAt: Date;
}
