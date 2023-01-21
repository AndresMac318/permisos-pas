import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Permiso } from 'src/app/models/permiso';
import { ResLogin } from 'src/app/models/ResLogin';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userActive: any;

  logueado = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(body:{email: string, password: string}){
    //console.log(body);
    
    return this.http.post<any>('http://localhost:3000/auth/login', body)
    .pipe(
      tap( res => {
        this.userActive = res.user;
        //console.log('map del authserv', this.userActive);
      })
    );
  }

  get role(){
    console.log('uactive',this.userActive.rol);
    return this.userActive.rol;
  }


}
