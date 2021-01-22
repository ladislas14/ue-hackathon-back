'use strict';

import { Exclude } from 'class-transformer';
import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
