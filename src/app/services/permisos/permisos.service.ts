import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
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
    //return this.http.post<{idAdministrativo: number, EmpleadoRows: number}>('http://localhost:3000/permisos/Ids', body).toPromise();
    //return this.http.post<{idAdministrativo: number, EmpleadoRows: number}>('http://3.217.5.10:3000/permisos/Ids', body).toPromise();
    return this.http.post<{idAdministrativo: number, EmpleadoRows: number}>('https://passapi.herokuapp.com/permisos/Ids', body).toPromise();
  }

  getIDLOGGUED(){
    return sessionStorage.getItem('id');
  }

  createPermiso(body:Permiso){
    //return this.http.post<any>(`http://localhost:3000/permisos`, body);
    //return this.http.post<any>(`http://3.217.5.10:3000/permisos`, body);
    return this.http.post<any>(`https://passapi.herokuapp.com/permisos`, body);
  }

  getPermisosAdmin(id:any){
    //return this.http.get<resPermiso[]>(`http://localhost:3000/permisos/${id}`);
    //return this.http.get<resPermiso[]>(`http://3.217.5.10:3000/permisos/${id}`);
    return this.http.get<resPermiso[]>(`https://passapi.herokuapp.com/permisos/${id}`);
  }

  getPermiso(id:any){
    //return this.http.get(`http://localhost:3000/permisos/employee/${id}`).toPromise();
    //return this.http.get(`http://3.217.5.10:3000/permisos/employee/${id}`).toPromise();
    return this.http.get(`https://passapi.herokuapp.com/permisos/employee/${id}`).toPromise();
  }
  
  getPermisoE(id:any){
    //return this.http.get(`http://localhost:3000/permisos/employee2/${id}`).toPromise();
    //return this.http.get(`http://3.217.5.10:3000/permisos/employee2/${id}`).toPromise();
    return this.http.get(`https://passapi.herokuapp.com/permisos/employee2/${id}`).toPromise();
  }

  //consultaPersona(): Observable<any> {
  getDataFinger(){
    const opcion = 2;
    const data = { opcion: opcion, nombre:'', id_huella:'' };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //return this.http.post('http://localhost/html/php/queryRead.php', data, httpOptions).toPromise();
    //return this.http.post('http://44.200.248.203/php/php/queryRead.php', data, httpOptions).toPromise();
    //return this.http.post('http://54.152.89.67/php/php/queryRead.php', data, httpOptions).toPromise();
    return this.http.post('https://passphp.herokuapp.com/php/queryRead.php', data, httpOptions).toPromise();
  }


  editPermiso(id:any, body: any){
    //return this.http.put(`http://localhost:3000/permisos/${id}`, body);
    //return this.http.put(`http://3.217.5.10:3000/permisos/${id}`, body);
    return this.http.put(`https://passapi.herokuapp.com/permisos/${id}`, body);
  }

  deletePermiso(id: any){
    //return this.http.delete(`http://localhost:3000/permisos/${id}`);
    //return this.http.delete(`http://3.217.5.10:3000/permisos/${id}`);
    return this.http.delete(`https://passapi.herokuapp.com/permisos/${id}`);
  }
  
  getSolicitudes(body:any){
    //return this.http.post<resPermiso[]>(`http://localhost:3000/permisos/solicitudes`, body);
    //return this.http.post<resPermiso[]>(`http://3.217.5.10:3000/permisos/solicitudes`, body);
    return this.http.post<resPermiso[]>(`https://passapi.herokuapp.com/permisos/solicitudes`, body);
  }

  getSolicitante(body:any){
    //return this.http.post<ResUser>('http://localhost:3000/user/me', body)
    //return this.http.post<ResUser>('http://3.217.5.10:3000/user/me', body)
    return this.http.post<ResUser>('https://passapi.herokuapp.com/user/me', body)
  }



}
