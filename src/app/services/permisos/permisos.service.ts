import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Permiso } from 'src/app/models/permiso';
import { ResLogin } from 'src/app/models/ResLogin';
import { ResUser } from 'src/app/models/resUser';
import { resPermiso } from 'src/app/models/resPermiso';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private http: HttpClient) {}

  getIds(body:any){
    return this.http.post<{idAdministrativo: number, EmpleadoRows: number}>('http://localhost:3000/user/permisosIds', body);
  }

  getIDLOGGUED(){
    return sessionStorage.getItem('id');
  }

  createPermiso(body:Permiso){
    return this.http.post(`http://localhost:3000/user/permisos`, body);
  }

  getPermisosAdmin(id:any){
    return this.http.get<resPermiso[]>(`http://localhost:3000/user/permisos/${id}`);
  }

  getSolicitante(body:any){
    return this.http.post<ResUser>('http://localhost:3000/user/me', body)
  }



}
