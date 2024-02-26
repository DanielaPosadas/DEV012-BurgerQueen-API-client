import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FinalProducts, Login, OrderKitchen, Product } from '../interfaces/interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  URL_API= 'http://localhost:8080'  

  getAccessToken(){
  return localStorage.getItem('accessToken');
  }
  
  getHeaders(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAccessToken(),
    });
  } 

  getlogIn(emailUser:string, passwordUser:string): Observable <Login>{
    const body = {email: emailUser, password: passwordUser}
    return this.http.post<Login>(`${this.URL_API}/login`, body, {headers: this.getHeaders()}).pipe(map(resp => {
      return resp as Login
    }))
  }

  AllProducts(): Observable <Product[]>{
    return this.http.get<Product[]>(`${this.URL_API}/products`, {headers: this.getHeaders()}).pipe(map(resp => {
      return resp as Product[]
    }))
  }

  customerOrder(orderKitchen:OrderKitchen): Observable <OrderKitchen>{
    const body = orderKitchen
    return this.http.post<OrderKitchen>(`${this.URL_API}/orders`, body, {headers: this.getHeaders()}).pipe(map(resp => {
      return resp as OrderKitchen
    }))
  }


}
