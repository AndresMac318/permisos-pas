import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  generos: string[] = ['masculino', 'femenino', 'hombre transexual', 'mujer transexual', 'bigenero', 'intersexual', 'no binario', 'prefiero no decir'];
  documentsNum: any ;

  @ViewChild('signatureEmpleado')
  public signatureObject!: SignatureComponent; 

  @ViewChild('clearbuttoncomponent')
  public clearButtonObject!: ButtonComponent;
  
  @ViewChild('savebuttoncomponent')
  public saveButtonObject!: ButtonComponent;

  constructor(private fb: UntypedFormBuilder, private _es: EmpleadoService) {
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
      Swal.fire(
        'Good!',
        'El admin fue creado!',
        'success'
      )
    })
    
  }

}
