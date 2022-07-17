import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';

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
    this._es.getEmpleados().subscribe(res => {
      this.empleados = res;
      //console.log(this.empleados[0]);
      
    })
  }

  toAddEmpleado() {
    this.router.navigateByUrl('/dashboard/empleado-add');
  }

}
