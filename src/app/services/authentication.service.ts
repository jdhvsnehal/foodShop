import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000'

  constructor(private http : HttpClient) { }

  login (username: string, password: string) : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users?username=${username}&password=${password}`);
  }

  signup (username: string, password: string, role: string) : Observable<any> {
    let user = {};
    if(role==='client') {
      let cart : any = {};
      user = {username, password, role, cart};
    }
    else user = {username, password, role};
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }
}
