import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private readonly API_URL = 'http://localhost:3000/api/clients';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Client[]> {
        return this.http.get<Client[]>(this.API_URL);
    }

    getById(id: string): Observable<Client> {
        return this.http.get<Client>(`${this.API_URL}/${id}`);
    }

    create(client: Partial<Client>): Observable<Client> {
        return this.http.post<Client>(this.API_URL, client);
    }

    update(id: string, client: Partial<Client>): Observable<Client> {
        return this.http.patch<Client>(`${this.API_URL}/${id}`, client);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
}
