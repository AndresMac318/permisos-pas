import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';


@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  admins: Empleado[] = [];

  constructor(private router: Router, private _es: EmpleadoService) { }

  ngOnInit(): void {
    this._es.getAdmins().subscribe(res => {
      this.admins = res;
      
      
    })
  }

  toNewAdmin() {
    this.router.navigateByUrl('/dashboard/admin-add');
  }

}
