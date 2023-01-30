import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Motivo } from 'src/app/models/motivo';

@Injectable({
  providedIn: 'root'
})
export class MotivosService {

  constructor(private http: HttpClient) { }
  
  getMotivos(){
    return this.http.get<Motivo[]>('https://passapi.herokuapp.com/motivos');
  }

  createMotivo(body: Motivo){
    return this.http.post<Motivo>('https://passapi.herokuapp.com/motivos', body);
  }

  getMotivo(id: any) {
    return this.http.get<Motivo[]>(`https://passapi.herokuapp.com/motivos/${id}`);
  }

  updateMotivo(id: any, body: Motivo){
    return this.http.put(`https://passapi.herokuapp.com/motivos/${body.codMotivo}`, body);
  }

  deleteMotivo(id:any){
    return this.http.delete(`https://passapi.herokuapp.com/motivos/${id}`);
  }

}
