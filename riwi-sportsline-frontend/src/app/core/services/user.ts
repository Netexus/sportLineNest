import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    id: string;
    email: string;
    isActive: boolean;
    roles: any[];
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly API_URL = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.API_URL);
    }

    getById(id: string): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/${id}`);
    }

    create(user: Partial<User>): Observable<User> {
        return this.http.post<User>(this.API_URL, user);
    }

    update(id: string, user: Partial<User>): Observable<User> {
        return this.http.patch<User>(`${this.API_URL}/${id}`, user);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
}
