import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toNewPermiso(){
    this.router.navigateByUrl('/dashboard/permisos-new');
  }

}
