import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../common/abstract.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('product')
export class ProductEntity extends AbstractEntity {
    @Column()
    @ApiProperty()
    @IsInt({ groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [UPDATE] })
    @Transform(parseInt)
    offId: number;

    @Column()
    @ApiProperty()
    @IsInt({ groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [UPDATE] })
    @Transform(parseInt)
    quantity: number;

    @Column()
    @ApiPropertyOptional()
    @IsInt({ groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [CREATE, UPDATE] })
    @Transform(parseInt)
    remainingQuantity: number;

    @Column()
    @ApiProperty()
    @IsDateString({ groups: [CREATE, UPDATE] })
    @IsOptional({ groups: [UPDATE] })
    date: Date;

    @Column({ type: 'float' })
    @ApiProperty()
    @IsNumber({}, { groups: [UPDATE] })
    @Transform(parseFloat)
    price: number;
}
