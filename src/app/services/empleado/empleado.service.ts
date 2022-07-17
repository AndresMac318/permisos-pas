import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Empleado } from '../../models/empleado';
import { ResIDS } from 'src/app/models/resIds';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  getEmpleados(){
    return this.http.get<Empleado[]>('http://localhost:3000/user/empleados');
  }

  createEmpleado(body: Empleado){
    return this.http.post<any>('http://localhost:3000/user/empleados', body);
  }
  
  createAdmin(body: Empleado){
    return this.http.post<any>('http://localhost:3000/user/admins', body);
  }

  getAdmins(){
    return this.http.get<Empleado[]>('http://localhost:3000/user/admins');
  }

  getIds(body:any){
    return this.http.post<ResIDS>('http://localhost:3000/user/permisosIds', body);
  }
}
