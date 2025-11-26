import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { Client } from '../clients/entities/client.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) { }

    async create(createOrderDto: CreateOrderDto) {
        const { clientId, productIds } = createOrderDto;

        const client = await this.clientRepository.findOneBy({ id: clientId });
        if (!client) {
            throw new NotFoundException(`Client with ID ${clientId} not found`);
        }

        const products = await this.productRepository.findBy({
            id: In(productIds),
        });

        if (products.length !== productIds.length) {
            throw new NotFoundException('One or more products not found');
        }

        const total = products.reduce((sum, product) => sum + Number(product.price), 0);

        const order = this.orderRepository.create({
            client,
            products,
            total,
        });

        return this.orderRepository.save(order);
    }

    findAll() {
        return this.orderRepository.find({
            relations: ['client', 'products'],
        });
    }

    async findOne(id: string) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['client', 'products'],
        });
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        const order = await this.findOne(id);
        const { clientId, productIds } = updateOrderDto;

        if (clientId) {
            const client = await this.clientRepository.findOneBy({ id: clientId });
            if (!client) {
                throw new NotFoundException(`Client with ID ${clientId} not found`);
            }
            order.client = client;
        }

        if (productIds) {
            const products = await this.productRepository.findBy({
                id: In(productIds),
            });
            if (products.length !== productIds.length) {
                throw new NotFoundException('One or more products not found');
            }
            order.products = products;
            // Recalculate total if products change
            order.total = products.reduce((sum, product) => sum + Number(product.price), 0);
        }

        return this.orderRepository.save(order);
    }

    async remove(id: string) {
        const order = await this.findOne(id);
        return this.orderRepository.remove(order);
    }
}
