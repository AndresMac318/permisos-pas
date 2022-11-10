import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Motivo } from 'src/app/models/motivo';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MotivosService {

  constructor(private http: HttpClient) { }
  
  getMotivos(){
    return this.http.get<Motivo[]>('http://localhost:3000/motivos');
  }

  createMotivo(body: Motivo){
    return this.http.post<Motivo>('http://localhost:3000/motivos', body);
  }

  getMotivo(id: any) {
    return this.http.get<Motivo[]>(`http://localhost:3000/motivos/${id}`);
  }

  updateMotivo(id: any, body: Motivo){
    return this.http.put(`http://localhost:3000/motivos/${body.codMotivo}`, body);
  }

  deleteMotivo(id:any){
    return this.http.delete(`http://localhost:3000/motivos/${id}`);
  }

}
