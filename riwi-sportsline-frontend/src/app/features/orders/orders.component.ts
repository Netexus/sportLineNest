import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order, OrderService } from '../../core/services/order';
import { Client, ClientService } from '../../core/services/client';
import { Product, ProductService } from '../../core/services/product';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4 max-w-7xl">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Orders Management</h2>
      
      <!-- Create Form -->
      <div class="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
        <h3 class="text-lg md:text-xl font-semibold mb-4 text-gray-700">Create New Order</h3>
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Client</label>
            <select [(ngModel)]="selectedClientId" 
                    class="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="">-- Select Client --</option>
              <option *ngFor="let client of clients" [value]="client.id">{{client.name}}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Products</label>
            <div class="border border-gray-300 p-3 rounded-md max-h-48 overflow-y-auto bg-gray-50">
              <div *ngFor="let product of products" class="flex items-center gap-2 mb-2 p-2 hover:bg-white rounded transition-colors">
                <input type="checkbox" [value]="product.id" (change)="toggleProduct(product.id, $event)"
                       class="w-4 h-4 text-purple-600 focus:ring-purple-500 rounded">
                <span class="text-sm md:text-base">{{product.name}} - <span class="font-semibold text-green-600">\${{product.price}}</span></span>
              </div>
            </div>
          </div>
        </div>
        <button (click)="createOrder()" 
                class="mt-4 w-full sm:w-auto bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors font-medium">
          Create Order
        </button>
      </div>

      <!-- List -->
      <div class="space-y-4">
        <div *ngFor="let order of orders" 
             class="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div class="flex-1">
              <h3 class="font-bold text-lg md:text-xl text-gray-800 mb-2">Order #{{order.id.slice(0,8)}}</h3>
              <p class="text-gray-600 text-sm md:text-base mb-1">👤 Client: {{order.client?.name || 'Unknown'}}</p>
              <p class="text-gray-600 text-sm md:text-base mb-2">📅 Date: {{order.date | date:'short'}}</p>
              <div class="flex flex-wrap gap-1">
                <span *ngFor="let p of order.products" 
                      class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                  {{p.name}}
                </span>
              </div>
            </div>
            <div class="flex flex-col items-start md:items-end gap-2">
              <p class="text-2xl md:text-3xl font-bold text-green-600">\${{order.total}}</p>
              <button (click)="deleteOrder(order.id)" 
                      class="w-full sm:w-auto text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-4 py-2 rounded-md transition-colors text-sm font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  clients: Client[] = [];
  products: Product[] = [];

  selectedClientId = '';
  selectedProductIds: string[] = [];

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.orderService.getAll().subscribe(data => this.orders = data);
    this.clientService.getAll().subscribe(data => this.clients = data);
    this.productService.getAll().subscribe(data => this.products = data);
  }

  toggleProduct(id: string, event: any) {
    if (event.target.checked) {
      this.selectedProductIds.push(id);
    } else {
      this.selectedProductIds = this.selectedProductIds.filter(pid => pid !== id);
    }
  }

  createOrder() {
    if (!this.selectedClientId || this.selectedProductIds.length === 0) {
      alert('Please select a client and at least one product');
      return;
    }

    const orderData = {
      clientId: this.selectedClientId,
      productIds: this.selectedProductIds
    };

    this.orderService.create(orderData as any).subscribe({
      next: () => {
        this.loadData();
        this.selectedClientId = '';
        this.selectedProductIds = [];
      },
      error: (err) => alert('Error creating order: ' + err.message)
    });
  }

  deleteOrder(id: string) {
    if (confirm('Are you sure?')) {
      this.orderService.delete(id).subscribe(() => this.loadData());
    }
  }
}
