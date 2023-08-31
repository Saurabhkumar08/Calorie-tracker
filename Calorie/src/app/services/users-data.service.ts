import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  searchFood(foodSearchTerm: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000';
  constructor(public http: HttpClient) {}
  saveUsers(data: any) {
    return this.http.post('http://localhost:3000/user/add', data);
  }
  getUsers() {
    return this.http.get('http://localhost:3000/user/get');
  }
  saveFood(data: any) {
    return this.http.post('http://localhost:3000/food/add', data);
  }
  getFood() {
    return this.http.get('http://localhost:3000/importuser/get');
  }
  getFoodReg(searchTerm: string) {
    return this.http.get(
      `http://localhost:3000/importuser/getfoodreg?keyword=${searchTerm}`
    );
  }

  getActivity() {
    return this.http.get('http://localhost:3000/ipactivity/get');
  }
  saveActivity(data: any) {
    return this.http.post('http://localhost:3000/activity/add', data);
  }
  getUserById(data: { userId: string; date?: string }): Observable<any> {
    const url = `${this.baseUrl}/user`;
    return this.http.post(url, data);
  }
  getUserByIdandDate(userId: string, selectedDate: any): Observable<any> {
    const url = `${this.baseUrl}/user/calorie/${userId}`;
    let params = new HttpParams();
    params = params.append('selectedDate', selectedDate);
    return this.http.get(url, { params });
  }
  deleteUser(userId: string): Observable<any> {
    const url = `${this.baseUrl}/user/delete/${userId}`;
    console.log(url);
    return this.http.delete(url);
  }
}
