import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Empleado } from '../../models/empleado';
import { ResIDS } from 'src/app/models/resIds';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  /* empleado */

  getEmpleados(){
    return this.http.get<Empleado[]>('http://localhost:3000/user/empleados');
  }

  createEmpleado(body: Empleado){
    return this.http.post<any>('http://localhost:3000/user/empleados', body);
  }

  updateEmpleado(id: any, body:Empleado){
    return this.http.put(`http://localhost:3000/user/empleados/${id}`, body);
  }

  getEmpleado(id:any){
    return this.http.get<Empleado[]>(`http://localhost:3000/user/empleados/${id}`);
  }

  deleteEmpleado(id: any){
    return this.http.delete(`http://localhost:3000/user/empleados/${id}`);
  }

  /* Admin */
  
  createAdmin(body: Empleado){
    return this.http.post<any>('http://localhost:3000/user/admins', body);
  }

  getAdmins(){
    return this.http.get<Empleado[]>('http://localhost:3000/user/admins');
  }

  getAdmin(id:any){
    return this.http.get<Empleado[]>(`http://localhost:3000/user/empleados/${id}`);
  }

  updateAdmin(id: any, body:Empleado){
    return this.http.put(`http://localhost:3000/user/empleados/${id}`, body);
  }

  deleteAdmin(id: any){
    return this.http.delete(`http://localhost:3000/user/admins/${id}`);
  }
}
