import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { resPermiso } from 'src/app/models/resPermiso';
import { PermisosService } from 'src/app/services/permisos/permisos.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  permisos: resPermiso[] = [];
  id:any;

  constructor(
    private router: Router, 
    private _ps: PermisosService, 
    private http: HttpClient
  ) {
    this.id = sessionStorage.getItem('id');  
    console.log(this.id);
  }

  ngOnInit(): void {
    this.cargarPermisos(parseInt(this.id));
  }

  toNewPermiso(){
    this.router.navigateByUrl('/dashboard/new-solicitud');
  }

  cargarPermisos(id:any){
    console.log('entro');
    const body = {id: this.id}
    this._ps.getSolicitudes(body).subscribe(res=>{
      this.permisos=res;
      console.log(this.permisos);
    })
  }

  toEdit(id:any){
    console.log('hi', id);
    this.router.navigateByUrl(`/dashboard/detalle/${id}`);
  }

}
