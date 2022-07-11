import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toAddEmpleado() {
    this.router.navigateByUrl('/dashboard/empleado-add');
  }

}
