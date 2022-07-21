import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  admins: Empleado[] = [];

  constructor(private router: Router, private _es: EmpleadoService) { }

  ngOnInit(): void {
    this.cargarAdmins();
  }

  cargarAdmins(){
    this._es.getAdmins().subscribe(res => {
      this.admins = res;
    })
  }

  toNewAdmin() {
    this.router.navigateByUrl('/dashboard/admin-add');
  }

  

  toEditAdmin(id: any){
    this.router.navigate(['dashboard/admin-edit/', id]);
  }

  deleteAdmin(id: any){
    Swal.fire({
      title: '¿Estas seguro de realizar esta acción?',
      text: "Estas a punto de eliminar un admin.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this._es.deleteAdmin(id).subscribe(res=>{/* ***** */
          console.log(res);
          Swal.fire(
            'Admin eliminado',
            'Haz eliminado un admin.',
            'success'
          );
          this.cargarAdmins();
        })

      }
    })
  }

}
