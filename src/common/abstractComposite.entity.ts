'use strict';

import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractCompositeEntity {
    @CreateDateColumn({
        type: 'timestamp without time zone',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp without time zone',
        name: 'updated_at',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'timestamp without time zone',
        name: 'deleted_at',
    })
    deletedAt: Date;
}
