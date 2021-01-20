import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsDateString,
    IsEnum,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../common/abstract.entity';
import { RecurrenceUnitType } from '../common/constants/recurrence-type';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('product')
export class ProductEntity extends AbstractEntity {
    @Column()
    @ApiProperty()
    @IsNumber({}, { groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [UPDATE] })
    @Transform(({ value }) => parseInt(value, 10))
    offId: number;

    @Column()
    @ApiProperty()
    @IsNumber({}, { groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [UPDATE] })
    @Transform(({ value }) => parseInt(value, 10))
    quantity: number;

    @Column()
    @ApiProperty()
    @IsDateString({ groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [UPDATE] })
    start: Date;

    @Column()
    @ApiProperty()
    @IsDateString({ groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [UPDATE] })
    end: Date;

    @Column({ default: false })
    @ApiPropertyOptional()
    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsBoolean({ groups: [CREATE, UPDATE] })
    recurrent: boolean;

    @Column({ type: 'enum', enum: RecurrenceUnitType, nullable: true })
    @ApiPropertyOptional({ type: 'enum', enum: RecurrenceUnitType })
    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsEnum(RecurrenceUnitType, { groups: [CREATE, UPDATE] })
    recurrenceUnit?: RecurrenceUnitType;

    @Column({ nullable: true })
    @ApiPropertyOptional()
    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsNumber({}, { groups: [CREATE, UPDATE] })
    @Transform(({ value }) => (value ? parseInt(value, 10) : null))
    recurrenceValue?: number;
}
