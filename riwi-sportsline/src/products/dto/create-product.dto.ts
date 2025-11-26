import { IsNotEmpty, IsString, IsNumber, IsPositive, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'Nike Air Max', description: 'Product name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Comfortable running shoes', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 99.99, description: 'Product price' })
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({ example: 50, description: 'Available stock' })
    @IsInt()
    @Min(0)
    stock: number;
}
