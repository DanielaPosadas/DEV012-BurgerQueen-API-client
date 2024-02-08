import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { APIService } from '../services/service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private service: APIService){}

  canActivate() {

    const accessToken = localStorage.getItem('accessToken');

    if(accessToken){
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }

  }
  
}
