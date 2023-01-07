import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Permiso } from 'src/app/models/permiso';
import { ResLogin } from 'src/app/models/ResLogin';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logueado = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(body:{email: string, password: string}){
    //console.log(body);
    
    return this.http.post<any>('http://localhost:3000/auth/login', body);
  }


}
