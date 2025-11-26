import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { Client } from '../clients/entities/client.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product, Client])],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule { }
