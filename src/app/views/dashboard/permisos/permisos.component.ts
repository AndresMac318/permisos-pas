import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/permiso';
import { resPermiso } from 'src/app/models/resPermiso';
import { PermisosService } from 'src/app/services/permisos/permisos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {

  permisos: resPermiso[] = [];
  id:any;

  constructor(private router: Router, private _ps: PermisosService, private http: HttpClient) {
    this.id=sessionStorage.getItem('id');
    /* console.log(this.id); */
    
  }

  ngOnInit(): void {
    this.cargarPermisos(this.id);
  }

  toNewPermiso(){
    this.router.navigateByUrl('/dashboard/permisos-new');
  }

  cargarPermisos(id:any){
    this._ps.getPermisosAdmin(id).subscribe(res=>{
      this.permisos=res;
      console.log(this.permisos);
    })
  }

  toEdit(id: any){
    this.router.navigateByUrl(`/dashboard/permisos-edit/${id}`);
  }

  deletePermiso(id:any){
    
    console.log(id);
    
    Swal.fire({
      title: '¿Estas seguro de realizar esta acción?',
      text: "Estas a punto de eliminar un permiso.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo'
    }).then((result) => {
      if (result.isConfirmed) {

        this._ps.deletePermiso(id).subscribe(res => {
          Swal.fire(
            'Good!',
            'El permiso fue eliminado!',
            'success'
          );
            this.cargarPermisos(this.id);
        })
      }
    })

    
  }

}
