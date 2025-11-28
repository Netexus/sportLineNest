import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client, ClientService } from '../../core/services/client';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4 max-w-7xl">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Clients Management</h2>
      
      <!-- Create Form -->
      <div class="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
        <h3 class="text-lg md:text-xl font-semibold mb-4 text-gray-700">Add New Client</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input [(ngModel)]="newClient.name" placeholder="Name" 
                 class="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          <input [(ngModel)]="newClient.email" placeholder="Email" type="email"
                 class="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          <input [(ngModel)]="newClient.phone" placeholder="Phone" 
                 class="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          <input [(ngModel)]="newClient.address" placeholder="Address" 
                 class="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
        </div>
        <button (click)="createClient()" 
                class="mt-4 w-full sm:w-auto bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors font-medium">
          Add Client
        </button>
      </div>

      <!-- List -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let client of clients" 
             class="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 class="font-bold text-lg md:text-xl text-gray-800 mb-2">{{client.name}}</h3>
          <p class="text-gray-600 text-sm md:text-base mb-1">📧 {{client.email}}</p>
          <p class="text-gray-600 text-sm md:text-base mb-1">📞 {{client.phone}}</p>
          <p class="text-gray-500 text-xs md:text-sm mb-3">📍 {{client.address}}</p>
          <button (click)="deleteClient(client.id)" 
                  class="w-full sm:w-auto text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-4 py-2 rounded-md transition-colors text-sm font-medium">
            Delete
          </button>
        </div>
      </div>
    </div>
  `
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  newClient: Partial<Client> = {};

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAll().subscribe(data => this.clients = data);
  }

  createClient() {
    if (!this.newClient.name || !this.newClient.email) return;

    this.clientService.create(this.newClient).subscribe(() => {
      this.loadClients();
      this.newClient = {};
    });
  }

  deleteClient(id: string) {
    if (confirm('Are you sure?')) {
      this.clientService.delete(id).subscribe(() => this.loadClients());
    }
  }
}
