import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login, } from '../interfaces/interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

    URL_API= 'http://localhost:8080'
    headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getlogIn(emailUser:string, passwordUser:string): Observable <Login>{
    const body = {email: emailUser, password: passwordUser}
    return this.http.post<Login>(`${this.URL_API}/login`, body, {headers: this.headers}).pipe(map(resp => {
      return resp as Login
    }))
  }


}
