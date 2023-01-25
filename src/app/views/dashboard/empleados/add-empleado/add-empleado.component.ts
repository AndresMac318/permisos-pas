import { Component, OnInit, ViewChild, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado';

import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-empleado',
  templateUrl: './add-empleado.component.html',
  styleUrls: ['./add-empleado.component.css']
})
export class AddEmpleadoComponent implements OnInit {

  dataHuella: any;

  formAddEmpleado!: UntypedFormGroup;

  generos: string[] = 
  [
  'masculino', 'femenino', 'hombre transexual', 'mujer transexual', 'bigenero', 'intersexual', 'no binario', 'prefiero no decir'
  ];

  documentsNum: any ;

  @ViewChild('signatureEmpleado')
  public signatureObject!: SignatureComponent;

  @ViewChild('clearbuttoncomponent')
  public clearButtonObject!: ButtonComponent;

  @ViewChild('savebuttoncomponent')
  public saveButtonObject!: ButtonComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private location: Location, 
    private _es: EmpleadoService,
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
      firma: ['', [Validators.required]]
    })
  }

  public saveSignature() {
    let base64: string = this.signatureObject.getSignature();
    if (base64 == null || base64 === "") {
      alert('Ingrese su firma');
    }
    this.formAddEmpleado.get('firma')?.setValue(base64);
  }

  guardarEmpleado() {

    if (this.documentsNum.includes(this.formAddEmpleado.controls['cedula'].value)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El número de documento ya esta registrado!!',
      });
      return;
    }

    if (this.formAddEmpleado.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Diligencie todos los campos!!',
      });
      return Object.values(this.formAddEmpleado.controls).forEach(control => {
        if (control instanceof UntypedFormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    const body: Empleado = {
      idHuella: this.formAddEmpleado.controls['idHuella'].value,
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

    console.log(body);
    

    this._es.createEmpleado(body).subscribe(res => {

      if (res.status === false) {
        Swal.fire(
          'Good!',
          'Ocurrio un error consulte con el administrador, code: 000xcemp!',
          'success'
        );
        this.location.back();
      }
      console.log(res);
      
      Swal.fire(
        'Good!',
        'El empleado fue creado!',
        'success'
      );
        this.location.back();

    });

  }

  consulta() {

    /* var opcion = 2;
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost/html/php/queryRead.php", true); 
    xhttp.setRequestHeader("Content-Type", "application/json");

    

    xhttp.onreadystatechange = function() {
      let id_;
      if (this.readyState == 4 && this.status == 200) {
        // Response
        let data = this.responseText;
        let lol = JSON.parse(data);
        id_ = lol[0].id_huella;
        alert(id_)
      }
      return id_;
      
    };

    console.log(this.dataHuella);
    

    var data =  { opcion: opcion, nombre:'', id_huella:'' };
    xhttp.send(JSON.stringify(data)); */
    console.log(this.formAddEmpleado.controls['idHuella'].value);
    

    if(this.formAddEmpleado.controls['idHuella'].value === '' || this.formAddEmpleado.controls['idHuella'].value === null){
      console.log('ingrese una huella')
      return;
    }

    let body = {
      opcion: 2,
      nombre: '',
      id_huella: this.formAddEmpleado.controls['idHuella'].value,
    } 

    this._es.getHuellaData(body).subscribe(res=>{
      console.log(res);
    })
  

  }

}
