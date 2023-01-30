import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userActive: any;

  logueado = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(body:{email: string, password: string}){
    return this.http.post<any>('https://passapi.herokuapp.com/auth/login', body)
    .pipe(
      tap( res => {
        this.userActive = res.user;
      })
    );
  }

  get role(){
    return this.userActive.rol;
  }


}
