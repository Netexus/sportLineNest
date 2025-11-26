import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @ManyToOne(() => Client, (client) => client.orders)
    client: Client;

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[];
}
