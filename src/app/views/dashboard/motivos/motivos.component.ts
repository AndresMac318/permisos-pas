import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Motivo } from 'src/app/models/motivo';
import { MotivosService } from 'src/app/services/motivos/motivos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-motivos',
  templateUrl: './motivos.component.html',
  styleUrls: ['./motivos.component.css']
})
export class MotivosComponent implements OnInit {

  motivos: Motivo[] = [];

  constructor(private _ms: MotivosService, private router: Router) { }

  ngOnInit(): void {
    this.getMotivos();
  }

  getMotivos(){
    this._ms.getMotivos().subscribe(res => {
      this.motivos = res;
    })
  }

  toNewMotivo(){
    this.router.navigateByUrl('dashboard/motivos-add');
  }

  toEditMotivo(id: any){
    this.router.navigate(['dashboard/motivos-edit/', id]);
  }

  deleteMotivo(id:any){
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
        this._ms.deleteMotivo(id).subscribe(res=>{
          console.log(res);
          Swal.fire(
            'Motivo eliminado',
            'Haz eliminado un motivo.',
            'success'
          );
          this.getMotivos();
        })

      }
    })

    
  }

}
