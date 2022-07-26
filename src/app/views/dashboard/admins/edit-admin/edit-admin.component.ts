import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  formEditAdmin!: UntypedFormGroup;
  admin!: Empleado;
  id!:number;
  generos: string[] = ['masculino', 'femenino', 'otro'];

  @ViewChild('signatureEmpleado')
  public signatureObject!: SignatureComponent; 

  @ViewChild('clearbuttoncomponent')
  public clearButtonObject!: ButtonComponent;
  
  @ViewChild('savebuttoncomponent')
  public saveButtonObject!: ButtonComponent;

  constructor(private router: ActivatedRoute, private fb: UntypedFormBuilder, private _es: EmpleadoService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
      //console.log(this.id);
      
    });

    this._es.getAdmin(this.id).subscribe(res=>{
      
      let {fnacimiento} = res[0];
      //console.log('server', fnacimiento);
      var mifecha = moment.utc(fnacimiento).format('YYYY-MM-DD');
      //console.log('mia',mifecha);
      this.admin = res[0];
      this.admin.fnacimiento = mifecha; 
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
    this.formEditAdmin = this.fb.group({
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
      firma: ['', [Validators.required]],
    })
  }

  cargarFormulario(){
    //console.log('cargar form');   
    this.formEditAdmin.controls['apellido1'].setValue(this.admin.apellido1);
    this.formEditAdmin.controls['apellido2'].setValue(this.admin.apellido2);
    this.formEditAdmin.controls['nombre1'].setValue(this.admin.nombre1);
    this.formEditAdmin.controls['nombre2'].setValue(this.admin.nombre2);
    this.formEditAdmin.controls['cedula'].setValue(this.admin.cedula);
    this.formEditAdmin.controls['email'].setValue(this.admin.email);
    this.formEditAdmin.controls['telefono'].setValue(this.admin.telefono);
    this.formEditAdmin.controls['direccion'].setValue(this.admin.direccion);
    this.formEditAdmin.controls['sexo'].setValue(this.admin.sexo);
    this.formEditAdmin.controls['fnacimiento'].setValue(this.admin.fnacimiento);
    this.formEditAdmin.controls['firma'].setValue(this.admin.firma);
  }

  public saveSignature(){
    /* this.signatureObject.save(); */
    let base64: string = this.signatureObject.getSignature();
    if (base64 == null || base64==="") {
      alert('Ingrese su firma');
    }
    this.formEditAdmin.get('firma')?.setValue(base64);
    /* console.log(base64); */
  }

  guardarAdmin(){
    if(this.formEditAdmin.invalid){
      alert('Diligencie todos los campos!!');
    }
    let body: Empleado = {
      cedula: this.formEditAdmin.controls['cedula'].value,
      apellido1: this.formEditAdmin.controls['apellido1'].value,
      apellido2: this.formEditAdmin.controls['apellido2'].value,
      nombre1: this.formEditAdmin.controls['nombre1'].value,
      nombre2: this.formEditAdmin.controls['nombre2'].value,
      email: this.formEditAdmin.controls['email'].value,
      password: this.formEditAdmin.controls['cedula'].value,
      telefono: this.formEditAdmin.controls['telefono'].value,
      direccion: this.formEditAdmin.controls['direccion'].value,
      sexo: this.formEditAdmin.controls['sexo'].value,
      fnacimiento: this.formEditAdmin.controls['fnacimiento'].value,
      firma: this.formEditAdmin.controls['firma'].value,
      rol: 'admin',
    }
    this._es.updateAdmin(this.id, body).subscribe(res=>{
      console.log(res);
    })
    //console.log(body);
    
  }

}
