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
    return this.http.get<Motivo[]>('http://localhost:3000/user/motivos');
  }

  createMotivo(body: Motivo){
    return this.http.post<Motivo>('http://localhost:3000/user/motivos', body);
  }

  getMotivo(id: any) {
    return this.http.get<Motivo[]>(`http://localhost:3000/user/motivos/${id}`);
  }

  updateMotivo(id: any, body: Motivo){
    return this.http.put(`http://localhost:3000/user/motivos/${body.codMotivo}`, body);
  }

  deleteMotivo(id:any){
    console.log(id);
    
    Swal.fire({
      title: '¿Estas seguro de realizar esta acción?',
      text: "Estas a punto de eliminar un motivo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/user/motivos/${id}`).subscribe(res=>{
        console.log(res);
        this.getMotivos().subscribe();
          Swal.fire(
            'Motivo eliminado',
            'Haz eliminado un motivo.',
            'success'
          )
        });

      }
    })
  }

}
