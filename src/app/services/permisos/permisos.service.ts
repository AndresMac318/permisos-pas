import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Permiso } from 'src/app/models/permiso';
import { ResUser } from 'src/app/models/resUser';
import { resPermiso } from 'src/app/models/resPermiso';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private http: HttpClient) {}

  getIds(body:any){
    return this.http.post<{idAdministrativo: number, EmpleadoRows: number}>('https://passapi.herokuapp.com/permisos/Ids', body).toPromise();
  }

  getIDLOGGUED(){
    return sessionStorage.getItem('id');
  }

  createPermiso(body:Permiso){
    return this.http.post<any>(`https://passapi.herokuapp.com/permisos`, body);
  }

  getPermisosAdmin(id:any){
    return this.http.get<resPermiso[]>(`https://passapi.herokuapp.com/permisos/${id}`);
  }

  getPermiso(id:any){
    return this.http.get(`https://passapi.herokuapp.com/permisos/employee/${id}`).toPromise();
  }
  
  getPermisoE(id:any){
    return this.http.get(`https://passapi.herokuapp.com/permisos/employee2/${id}`).toPromise();
  }

  getDataFinger(){
    const opcion = 2;
    const data = { opcion: opcion, nombre:'', id_huella:'' };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('https://passphp.herokuapp.com/php/queryRead.php', data, httpOptions).toPromise();
  }


  editPermiso(id:any, body: any){
    return this.http.put(`https://passapi.herokuapp.com/permisos/${id}`, body);
  }

  deletePermiso(id: any){
    return this.http.delete(`https://passapi.herokuapp.com/permisos/${id}`);
  }
  
  getSolicitudes(body:any){
    return this.http.post<resPermiso[]>(`https://passapi.herokuapp.com/permisos/solicitudes`, body);
  }

  getSolicitante(body:any){
    return this.http.post<ResUser>('https://passapi.herokuapp.com/user/me', body)
  }
  
}
