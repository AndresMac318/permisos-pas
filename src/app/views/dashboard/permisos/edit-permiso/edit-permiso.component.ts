import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Motivo } from 'src/app/models/motivo';

import * as moment from 'moment';

@Component({
  selector: 'app-edit-permiso',
  templateUrl: './edit-permiso.component.html',
  styleUrls: ['./edit-permiso.component.css']
})
export class EditPermisoComponent implements OnInit {

  formEditPermiso!: FormGroup;

  permisos = [];
  motivos: Motivo[] = [];
  fechaNow = new Date();
  fecha = moment.utc(this.fechaNow.setMinutes(this.fechaNow.getMinutes() + this.fechaNow.getTimezoneOffset())).format('YYYY-MM-DD HH:MM:SS');

  constructor() { }

  ngOnInit(): void {
  }

  guardarPermiso(){
    console.log('permiso guardado');
  }

  open(){
    console.log('open');
    
  }

}
