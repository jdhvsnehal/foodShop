import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addDish (name: string, category: string, description: string, imgUrl: string, price: number): Observable<any> {
    const dish = {name, category, description, imgUrl, price};
    return this.http.post<any>(`${this.apiUrl}/dishes`, dish);
  }

  allDishes (): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/dishes`);
  }

  updateDish (name: string, category: string, description: string, imgUrl: string, price: number, id: number): Observable<any> {
    const dish = {name, category, description, imgUrl, price};
    return this.http.put<any>(`${this.apiUrl}/dishes/${id}`, dish);
  }

  deleteDish(id:number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/dishes/${id}`);
  }

  getDish (id: string) {
    return this.http.get(`${this.apiUrl}/dishes/${id}`);
  } 
}

