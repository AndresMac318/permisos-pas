import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Empleado } from '../../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  getEmpleados(){
    return this.http.get<Empleado[]>(`https://passapi.herokuapp.com/empleados`);
  }

  getCedulas(){
    return this.http.get<Empleado[]>(`https://passapi.herokuapp.com/empleados`);    
  } 

  createEmpleado(body: Empleado){
    return this.http.post<any>(`https://passapi.herokuapp.com/empleados`, body);
  }

  updateEmpleado(id: any, body:Empleado){
    return this.http.put(`https://passapi.herokuapp.com/empleados/${id}`, body);
  }

  getEmpleado(id:any){
    return this.http.get<any>(`https://passapi.herokuapp.com/empleados/${id}`);
  }
  
  getEmpleadoAsync(id:any){
    return this.http.get<any>(`https://passapi.herokuapp.com/empleados/${id}`).toPromise();
  }

  deleteEmpleado(id: any){
    return this.http.delete(`https://passapi.herokuapp.com/empleados/${id}`);
  }

  getHuellaData(body: any){
    return this.http.post('https://passphp.herokuapp.com/php/queryRead.php', body).toPromise();
  }
  
  createAdmin(body: Empleado){
    return this.http.post<any>(`https://passapi.herokuapp.com/admins`, body);
  }

  getAdmins(){
    return this.http.get<Empleado[]>(`https://passapi.herokuapp.com/admins`);
  }

  getAdmin(id:any){
    return this.http.get<any>(`https://passapi.herokuapp.com/admins/${id}`);
  }
  
  getAdminID(id:any){
    return this.http.get(`https://passapi.herokuapp.com/admins/by/${id}`).toPromise();
  }

  updateAdmin(id: any, body:Empleado){
    return this.http.put(`https://passapi.herokuapp.com/admins/${id}`, body);
  }

  deleteAdmin(id: any){
    return this.http.delete(`https://passapi.herokuapp.com/admins/${id}`);
  }

}
