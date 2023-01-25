import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import * as moment from 'moment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  formEmpleado!: UntypedFormGroup;
  empleado!: Empleado;
  id!:any;
  generos: string[] = [
    'masculino', 'femenino', 'prefiero no decir'
  ];

  constructor(private fb: FormBuilder, private _es: EmpleadoService, private route: Location ) {
    this.id = localStorage.getItem('cod');
    this.crearFormulario();
  }

  ngOnInit(): void {
    this._es.getEmpleado(this.id).subscribe(res => {
      console.log(res);
      
      let {fnacimiento} = res.empleado;
      //?console.log('server', fnacimiento);
      var mifecha = moment.utc(fnacimiento).format('YYYY-MM-DD');
      //console.log('mia',mifecha);
      this.empleado = res.empleado;      
      this.empleado.fnacimiento = mifecha; 
      this.cargarFormulario();
    })
  }

  crearFormulario(){
    //console.log('crear form');
    this.formEmpleado = this.fb.group({
      nombre: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      sexo: ['', Validators.required],
      fnacimiento: ['', [Validators.required]],
      firma: ['', [Validators.required]]
    })
  }

  cargarFormulario(){
    //console.log('cargar form');   
    this.formEmpleado.controls['nombre'].setValue(`${this.empleado.nombre1+' '+this.empleado.nombre2+' '+this.empleado.apellido1+' '+this.empleado.apellido2}`);
    this.formEmpleado.controls['cedula'].setValue(this.empleado.cedula);
    this.formEmpleado.controls['email'].setValue(this.empleado.email);
    this.formEmpleado.controls['telefono'].setValue(this.empleado.telefono);
    this.formEmpleado.controls['direccion'].setValue(this.empleado.direccion);
    this.formEmpleado.controls['sexo'].setValue(this.empleado.sexo);
    this.formEmpleado.controls['fnacimiento'].setValue(this.empleado.fnacimiento);
    //this.formEditEmpleado.controls['firma'].setValue(this.empleado.firma);
  }

  guardarEmpleado(){
    this.route.back();
  }

}
