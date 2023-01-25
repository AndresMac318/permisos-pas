import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { Empleado } from 'src/app/models/empleado';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  formAddAdmin!: UntypedFormGroup;
  generos: string[] = ['masculino', 'femenino', 'prefiero no decir'];
  documentsNum: any ;

  @ViewChild('signatureEmpleado')
  public signatureObject!: SignatureComponent; 

  @ViewChild('clearbuttoncomponent')
  public clearButtonObject!: ButtonComponent;
  
  @ViewChild('savebuttoncomponent')
  public saveButtonObject!: ButtonComponent;

  constructor(
    private fb: UntypedFormBuilder, 
    private _es: EmpleadoService,
    private location: Location
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this._es.getCedulas().pipe(
      map( personas => {
        let cedulas: any = [];
        personas.forEach(persona => {
          cedulas.push(persona.cedula);
        })
        personas = cedulas;
        this.documentsNum = personas;
      })
    ).subscribe();
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
    this.formAddAdmin = this.fb.group({
      idHuella: [''],
      apellido1: ['', [Validators.required, Validators.minLength(2)]],
      apellido2: ['', [Validators.required, Validators.minLength(2)]],
      nombre1: ['', [Validators.required, Validators.minLength(2)]],
      nombre2: [''],
      cedula: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono: ['', [Validators.required, Validators.minLength(7)]],
      direccion: ['', [Validators.required, Validators.minLength(6)]],
      sexo: ['', Validators.required],
      fnacimiento: ['', [Validators.required]],
      firma: ['', [Validators.required]],
    })
  }

  public saveSignature(){
    let base64: string = this.signatureObject.getSignature();
    if (base64 == null || base64==="") {
      alert('Ingrese su firma');
    }
    this.formAddAdmin.get('firma')?.setValue(base64);
  }

  guardarAdmin(){

    if (this.documentsNum.includes(this.formAddAdmin.controls['cedula'].value)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El número de documento ya esta registrado!!',
      });
      return;
    }
    
    if (this.formAddAdmin.invalid) {
      alert('Diligencie todos los campos!!')
      return Object.values(this.formAddAdmin.controls).forEach(control => {
        if (control instanceof UntypedFormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    const body : Empleado = {
      idHuella: this.formAddAdmin.controls['idHuella'].value,
      cedula: this.formAddAdmin.controls['cedula'].value,
      apellido1: this.formAddAdmin.controls['apellido1'].value,
      apellido2: this.formAddAdmin.controls['apellido2'].value,
      nombre1: this.formAddAdmin.controls['nombre1'].value,
      nombre2: this.formAddAdmin.controls['nombre2'].value,
      email: this.formAddAdmin.controls['email'].value,
      password: this.formAddAdmin.controls['cedula'].value,
      telefono: this.formAddAdmin.controls['telefono'].value,
      direccion: this.formAddAdmin.controls['direccion'].value,
      sexo: this.formAddAdmin.controls['sexo'].value,
      fnacimiento: this.formAddAdmin.controls['fnacimiento'].value,
      firma: this.formAddAdmin.controls['firma'].value,
      rol: 'admin',
    };

    this._es.createAdmin(body).subscribe(res => {
      if (res.status === false) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrio un error!',
          footer: res.msg
        });
      }

      Swal.fire({
        icon: 'success',
        title: 'Ok!',
        text: 'Admin agregado',
      });
      this.location.back();


    })
    
  }

  consulta(){
    console.log(this.formAddAdmin.controls['idHuella'].value);
    

    if(this.formAddAdmin.controls['idHuella'].value === '' || this.formAddAdmin.controls['idHuella'].value === null){
      console.log('ingrese una huella')
      return;
    }

    let body = {
      opcion: 2,
      nombre: '',
      id_huella: this.formAddAdmin.controls['idHuella'].value,
    } 

    this._es.getHuellaData(body).subscribe(res=>{
      console.log(res);
    })
  }

}
