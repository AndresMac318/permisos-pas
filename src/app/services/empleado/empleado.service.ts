import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Empleado } from '../../models/empleado';
import { ResIDS } from 'src/app/models/resIds';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  /* empleado */

  getEmpleados(){
    //return this.http.get<Empleado[]>(`http://localhost:3000/empleados`);
    return this.http.get<Empleado[]>(`http://3.217.5.10:3000/empleados`);
  }

  getCedulas(){
    //return this.http.get<Empleado[]>(`http://localhost:3000/empleados`);    
    return this.http.get<Empleado[]>(`http://3.217.5.10:3000/empleados`);    
  } 

  createEmpleado(body: Empleado){
    //return this.http.post<any>(`http://localhost:3000/empleados`, body);
    return this.http.post<any>(`http://3.217.5.10:3000/empleados`, body);
  }

  updateEmpleado(id: any, body:Empleado){
    //console.log(body);
    //return this.http.put(`http://localhost:3000/empleados/${id}`, body);
    return this.http.put(`http://3.217.5.10:3000/empleados/${id}`, body);
  }

  getEmpleado(id:any){
    //return this.http.get<any>(`http://localhost:3000/empleados/${id}`);
    return this.http.get<any>(`http://3.217.5.10:3000/empleados/${id}`);
  }
  
  getEmpleadoAsync(id:any){
    //return this.http.get<any>(`http://localhost:3000/empleados/${id}`).toPromise();
    return this.http.get<any>(`http://3.217.5.10:3000/empleados/${id}`).toPromise();
  }

  deleteEmpleado(id: any){
    //return this.http.delete(`http://localhost:3000/empleados/${id}`);
    return this.http.delete(`http://3.217.5.10:3000/empleados/${id}`);
  }


  /* INICIO Consultar huella */

  getHuellaData(body: any){
    //return this.http.post('http://localhost/html/php/queryRead.php', body).toPromise();
    return this.http.post('http://44.200.248.203/php/php/queryRead.php', body).toPromise();
  }

  /* FIN Consultar huella */

  /* Admin */
  
  createAdmin(body: Empleado){
    //return this.http.post<any>(`http://localhost:3000/admins`, body);
    return this.http.post<any>(`http://3.217.5.10:3000/admins`, body);
  }

  getAdmins(){
    //return this.http.get<Empleado[]>(`http://localhost:3000/admins`);
    return this.http.get<Empleado[]>(`http://3.217.5.10:3000/admins`);
  }

  getAdmin(id:any){
    //return this.http.get<any>(`http://localhost:3000/admins/${id}`);
    return this.http.get<any>(`http://3.217.5.10:3000/admins/${id}`);
  }
  
  getAdminID(id:any){
    //return this.http.get(`http://localhost:3000/admins/by/${id}`).toPromise();
    return this.http.get(`http://3.217.5.10:3000/admins/by/${id}`).toPromise();
  }

  updateAdmin(id: any, body:Empleado){
    //return this.http.put(`http://localhost:3000/admins/${id}`, body);
    return this.http.put(`http://3.217.5.10:3000/admins/${id}`, body);
  }

  deleteAdmin(id: any){
    //return this.http.delete(`http://localhost:3000/admins/${id}`);
    return this.http.delete(`http://3.217.5.10:3000/admins/${id}`);
  }

}
