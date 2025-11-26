import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Client } from '../clients/entities/client.entity';
import { Order } from '../orders/entities/order.entity';
import { config } from 'dotenv';

config();

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Product, Client, Order],
    synchronize: false,
});

async function seed() {
    await dataSource.initialize();
    console.log('Seeding started...');

    const userRepository = dataSource.getRepository(User);
    const productRepository = dataSource.getRepository(Product);
    const clientRepository = dataSource.getRepository(Client);

    // Seed Users
    const user = new User();
    user.email = 'admin@riwi.io';
    user.password = 'admin123'; // In real app, hash this!
    user.isActive = true;
    await userRepository.save(user);

    // Seed Products
    const product = new Product();
    product.name = 'Running Shoes';
    product.description = 'High performance running shoes';
    product.price = 99.99;
    product.stock = 100;
    await productRepository.save(product);

    // Seed Clients
    const client = new Client();
    client.name = 'John Doe';
    client.email = 'john@example.com';
    client.phone = '1234567890';
    client.address = '123 Main St';
    await clientRepository.save(client);

    console.log('Seeding completed!');
    await dataSource.destroy();
}

seed().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});
