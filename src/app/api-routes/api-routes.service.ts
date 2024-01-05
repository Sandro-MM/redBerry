import { Injectable, HostListener } from '@angular/core';
import { environment } from '../../enviroments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRoutesService {
  apiKey: string = '';

  private baseUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Authorization': this.apiKey,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {
    this.apiKey = localStorage.getItem('token') || '';
    this.handleStorageChange({ key: 'token', newValue: this.apiKey } as StorageEvent);
  }

  getToken(): Observable<any> {
    return this.http.get(`${this.baseUrl}/token`, { headers: this.headers }).pipe(
      tap((token: any) => {
        this.apiKey = token || '';
        localStorage.setItem('token', this.apiKey);
      })
    );
  }

  @HostListener('window:storage', ['$event'])
  handleStorageChange(event: StorageEvent) {
    if (event.key === 'token') {
      this.apiKey = event.newValue || '';
      this.headers = this.headers.set('Authorization', this.apiKey);
    }
  }
}

