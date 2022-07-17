import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Motivo } from 'src/app/models/motivo';
import { MotivosService } from 'src/app/services/motivos/motivos.service';

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
    this._ms.deleteMotivo(id);
    
    this.getMotivos();
    //this.router.navigateByUrl('dashboard/motivos')
  }

}
