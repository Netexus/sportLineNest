import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../core/services/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4 max-w-7xl">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Users Management</h2>
      
      <!-- Create Form -->
      <div class="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
        <h3 class="text-lg md:text-xl font-semibold mb-4 text-gray-700">Add New User</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input [(ngModel)]="newUser.email" placeholder="Email" type="email"
                 class="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          <input [(ngModel)]="password" type="password" placeholder="Password" 
                 class="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
        </div>
        <button (click)="createUser()" 
                class="mt-4 w-full sm:w-auto bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors font-medium">
          Add User
        </button>
      </div>

      <!-- List -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let user of users" 
             class="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 class="font-bold text-lg md:text-xl text-gray-800 mb-2">{{user.email}}</h3>
          <p class="text-sm md:text-base mb-2" [class.text-green-600]="user.isActive" [class.text-red-600]="!user.isActive">
            <span class="inline-block w-2 h-2 rounded-full mr-2" [class.bg-green-600]="user.isActive" [class.bg-red-600]="!user.isActive"></span>
            {{user.isActive ? 'Active' : 'Inactive'}}
          </p>
          <div class="mt-2 flex flex-wrap gap-1">
            <span *ngFor="let role of user.roles" class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
              {{role.name}}
            </span>
          </div>
          <button (click)="deleteUser(user.id)" 
                  class="mt-3 w-full sm:w-auto text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-4 py-2 rounded-md transition-colors text-sm font-medium">
            Delete
          </button>
        </div>
      </div>
    </div>
  `
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser: any = {};
  password = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe(data => this.users = data);
  }

  createUser() {
    if (!this.newUser.email || !this.password) return;

    this.userService.create({ ...this.newUser, password: this.password }).subscribe(() => {
      this.loadUsers();
      this.newUser = {};
      this.password = '';
    });
  }

  deleteUser(id: string) {
    if (confirm('Are you sure?')) {
      this.userService.delete(id).subscribe(() => this.loadUsers());
    }
  }
}
