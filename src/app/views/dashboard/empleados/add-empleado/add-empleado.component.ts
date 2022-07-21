import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado';

import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-empleado',
  templateUrl: './add-empleado.component.html',
  styleUrls: ['./add-empleado.component.css']
})
export class AddEmpleadoComponent implements OnInit {

  formAddEmpleado!: FormGroup;

  generos: string[] = ['masculino', 'femenino', 'otro'];

  //roles : string[] = ['talento humano', 'jefe inmediato', 'empleado']; 

  @ViewChild('signatureEmpleado')
  public signatureObject!: SignatureComponent;

  @ViewChild('clearbuttoncomponent')
  public clearButtonObject!: ButtonComponent;

  @ViewChild('savebuttoncomponent')
  public saveButtonObject!: ButtonComponent;

  constructor(private fb: FormBuilder, private _es: EmpleadoService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  signaturePadChangeState() {
    if (!this.signatureObject.isEmpty()) {
      this.saveButtonObject.disabled = false;
      this.clearButtonObject.disabled = false;
    }
  }

  public clearSignature() {
    this.signatureObject.clear();
    if (this.signatureObject.isEmpty()) {
      this.saveButtonObject.disabled = true;
      this.clearButtonObject.disabled = true;
    }
  }

  crearFormulario() {
    this.formAddEmpleado = this.fb.group({
      apellido1: ['', [Validators.required]],
      apellido2: ['', [Validators.required]],
      nombre1: ['', [Validators.required]],
      nombre2: ['',],
      cedula: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      sexo: ['', Validators.required],
      fnacimiento: ['', [Validators.required]],
      firma: ['', [Validators.required]]
    })
  }

  public saveSignature() {
    /* this.signatureObject.save(); */
    let base64: string = this.signatureObject.getSignature();
    if (base64 == null || base64 === "") {
      alert('Ingrese su firma');
    }
    this.formAddEmpleado.get('firma')?.setValue(base64);
    /* console.log(base64); */
  }

  guardarEmpleado() {

    if (this.formAddEmpleado.invalid) {
      alert('Diligencie todos los campos!!')
      console.log(this.formAddEmpleado.value);

      return Object.values(this.formAddEmpleado.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    const body: Empleado = {
      cedula: this.formAddEmpleado.controls['cedula'].value,
      apellido1: this.formAddEmpleado.controls['apellido1'].value,
      apellido2: this.formAddEmpleado.controls['apellido2'].value,
      nombre1: this.formAddEmpleado.controls['nombre1'].value,
      nombre2: this.formAddEmpleado.controls['nombre2'].value,
      email: this.formAddEmpleado.controls['email'].value,
      password: this.formAddEmpleado.controls['cedula'].value,
      telefono: this.formAddEmpleado.controls['telefono'].value,
      direccion: this.formAddEmpleado.controls['direccion'].value,
      sexo: this.formAddEmpleado.controls['sexo'].value,
      fnacimiento: this.formAddEmpleado.controls['fnacimiento'].value,
      firma: this.formAddEmpleado.controls['firma'].value,
      rol: 'empleado',
    };
    this._es.createEmpleado(body).subscribe(res => {
      //console.log(res)
      
      Swal.fire(
        'Good!',
        'El permiso fue creado!',
        'success'
      )
    })

  }

}
