import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];

  constructor(private router: Router, private _es: EmpleadoService) {
    
  }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(){
    this._es.getEmpleados().subscribe(res => {
      this.empleados = res;
      //console.log(this.empleados[0]);
    })
  }

  toAddEmpleado() {
    this.router.navigateByUrl('/dashboard/empleado-add');
  }

  toEditEmpleado(id: any){
    this.router.navigate(['dashboard/empleado-edit/', id]);
  }

  deleteEmpleado(id:any){
    Swal.fire({
      title: '¿Estas seguro de realizar esta acción?',
      text: "Estas a punto de eliminar un empleado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this._es.deleteEmpleado(id).subscribe(res=>{
          //?console.log(res);
          Swal.fire(
            'Empleado eliminado',
            'Haz eliminado un empleado.',
            'success'
          );
          this.cargarEmpleados();
        })

      }
    })
    
    //this.router.navigateByUrl('dashboard/motivos')
  }

}
