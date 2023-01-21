import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.css']
})
export class EditEmpleadoComponent implements OnInit {

  formEditEmpleado!: UntypedFormGroup;
  empleado!: Empleado;
  id!:number;
  generos: string[] = [
    'masculino', 'femenino', 'hombre transexual', 'mujer transexual', 'bigenero', 'intersexual', 'no binario', 'prefiero no decir'
  ];

  @ViewChild('signatureEmpleado')
  public signatureObject!: SignatureComponent; 

  @ViewChild('clearbuttoncomponent')
  public clearButtonObject!: ButtonComponent;
  
  @ViewChild('savebuttoncomponent')
  public saveButtonObject!: ButtonComponent;

  constructor(
    private router: ActivatedRoute, 
    private fb: UntypedFormBuilder,
    private location: Location, 
    private _es: EmpleadoService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
      //console.log(this.id);
    });

    this._es.getEmpleado(this.id).subscribe(res=>{
      
      let {fnacimiento} = res[0];
      //?console.log('server', fnacimiento);
      var mifecha = moment.utc(fnacimiento).format('YYYY-MM-DD');
      //console.log('mia',mifecha);
      this.empleado = res[0];
      this.empleado.fnacimiento = mifecha; 
      this.cargarFormulario();
    })
  }

  signaturePadChangeState(){
    if(!this.signatureObject.isEmpty()){
      this.saveButtonObject.disabled=false;
      this.clearButtonObject.disabled=false;
    }
  }

  public clearSignature(){
    this.signatureObject.clear();
    if (this.signatureObject.isEmpty()) {
      this.saveButtonObject.disabled = true;
      this.clearButtonObject.disabled = true;
    }
  }

  crearFormulario(){
    //console.log('crear form');
    this.formEditEmpleado = this.fb.group({
      apellido1: ['', [Validators.required]],
      apellido2: ['', [Validators.required]],
      nombre1: ['', [Validators.required]],
      nombre2: ['', [Validators.required]],
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
    this.formEditEmpleado.controls['apellido1'].setValue(this.empleado.apellido1);
    this.formEditEmpleado.controls['apellido2'].setValue(this.empleado.apellido2);
    this.formEditEmpleado.controls['nombre1'].setValue(this.empleado.nombre1);
    this.formEditEmpleado.controls['nombre2'].setValue(this.empleado.nombre2);
    this.formEditEmpleado.controls['cedula'].setValue(this.empleado.cedula);
    this.formEditEmpleado.controls['email'].setValue(this.empleado.email);
    this.formEditEmpleado.controls['telefono'].setValue(this.empleado.telefono);
    this.formEditEmpleado.controls['direccion'].setValue(this.empleado.direccion);
    this.formEditEmpleado.controls['sexo'].setValue(this.empleado.sexo);
    this.formEditEmpleado.controls['fnacimiento'].setValue(this.empleado.fnacimiento);
    this.formEditEmpleado.controls['firma'].setValue(this.empleado.firma);
  }

  public saveSignature(){
    /* this.signatureObject.save(); */
    let base64: string = this.signatureObject.getSignature();
    if (base64 == null || base64==="") {
      alert('Ingrese su firma');
    }
    this.formEditEmpleado.get('firma')?.setValue(base64);
    /* console.log(base64); */
  }

  guardarEmpleado(){
    if(this.formEditEmpleado.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Diligencie todos los campos!!',
      });
      return;
    }
    let body: Empleado = {
      cedula: this.formEditEmpleado.controls['cedula'].value,
      apellido1: this.formEditEmpleado.controls['apellido1'].value,
      apellido2: this.formEditEmpleado.controls['apellido2'].value,
      nombre1: this.formEditEmpleado.controls['nombre1'].value,
      nombre2:this.formEditEmpleado.controls['nombre2'].value,
      email: this.formEditEmpleado.controls['email'].value,
      password: this.formEditEmpleado.controls['cedula'].value,
      telefono: this.formEditEmpleado.controls['telefono'].value,
      direccion: this.formEditEmpleado.controls['direccion'].value,
      sexo: this.formEditEmpleado.controls['sexo'].value,
      fnacimiento: this.formEditEmpleado.controls['fnacimiento'].value,
      firma: this.formEditEmpleado.controls['firma'].value,
      rol: 'empleado',
    }
    this._es.updateEmpleado(this.id, body).subscribe(res=>{
      Swal.fire(
        'Good!',
        'El empleado fue actualizado!',
        'success'
      );
        this.location.back();
    })
    //console.log(body);
    
  }

}
