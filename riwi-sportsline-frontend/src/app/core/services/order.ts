import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
    id: string;
    date: Date;
    total: number;
    client: any;
    products: any[];
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private readonly API_URL = 'http://localhost:3000/api/orders';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Order[]> {
        return this.http.get<Order[]>(this.API_URL);
    }

    getById(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.API_URL}/${id}`);
    }

    create(order: Partial<Order>): Observable<Order> {
        return this.http.post<Order>(this.API_URL, order);
    }

    update(id: string, order: Partial<Order>): Observable<Order> {
        return this.http.patch<Order>(`${this.API_URL}/${id}`, order);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
}
