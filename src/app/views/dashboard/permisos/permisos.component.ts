import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permiso } from 'src/app/models/permiso';
import { resPermiso } from 'src/app/models/resPermiso';
import { PermisosService } from 'src/app/services/permisos/permisos.service';

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
    })
  }



}
