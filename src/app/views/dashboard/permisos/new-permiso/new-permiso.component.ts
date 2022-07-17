import { Component, createPlatform, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';

@Component({
  selector: 'app-new-permiso',
  templateUrl: './new-permiso.component.html',
  styleUrls: ['./new-permiso.component.css']
})
export class NewPermisoComponent implements OnInit {

  formNewPermiso!: FormGroup;

  cedAut= 0;
  cedSol=0;

  motivos: string[] = ['cita odontologia', 'cita medica', 'emergencia familiar']

  @ViewChild('signatureAutoriza')
  public signatureObject!: SignatureComponent; 
  
  @ViewChild('signatureSolicita')
  public signatureObject2!: SignatureComponent; 
  
  @ViewChild('clearbuttoncomponent')
  public clearButtonObject!: ButtonComponent;
  
  @ViewChild('savebuttoncomponent')
  public saveButtonObject!: ButtonComponent;
  
  @ViewChild('clearbuttoncomponent2')
  public clearButtonObject2!: ButtonComponent;
  
  @ViewChild('savebuttoncomponent2')
  public saveButtonObject2!: ButtonComponent;

  constructor(private fb: FormBuilder, private _es: EmpleadoService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  public signaturePadChangeState(){
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
  
  public signaturePadChangeState2(){
    if(!this.signatureObject2.isEmpty()){
      this.saveButtonObject2.disabled=false;
      this.clearButtonObject2.disabled=false;
    }
  }

  public clearSignature2(){
    this.signatureObject2.clear();
    if (this.signatureObject.isEmpty()) {
      this.saveButtonObject.disabled = true;
      this.clearButtonObject.disabled = true;
    }
  }

  crearFormulario(){
    this.formNewPermiso = this.fb.group({
      cedAutoriza: ['', [Validators.required, Validators.minLength(7)]],
      cedSolicita: ['', [Validators.required, Validators.minLength(7)]],
      fcreacion: ['', [Validators.required]],
      codMotivo: ['', [Validators.required]],
      fsalida: ['', [Validators.required]],
      fentrada: ['', [Validators.required]],
      firmaAutoriza: ['', [Validators.required]],
      firmaSolicita: ['', [Validators.required]]
    })
  }

  public saveSignature(){
    /* this.signatureObject.save(); */
    let base64: string = this.signatureObject.getSignature();
    if (base64 == null || base64==="") {
      alert('Ingrese su firma');
    }
    this.formNewPermiso.get('firmaAutoriza')?.setValue(base64);
    /* console.log(base64); */
  }
  
  public saveSignature2(){
    /* this.signatureObject.save(); */
    let base64: string = this.signatureObject2.getSignature();
    if (base64 == null || base64==="") {
      alert('Ingrese su firma');
    }
    this.formNewPermiso.get('firmaSolicita')?.setValue(base64);
    /* console.log(base64); */
  }

  consultarIds(){
    let body = {
      idAutoriza: this.formNewPermiso.controls['cedAutoriza'].value,
      idSolicita: this.formNewPermiso.controls['cedSolicita'].value
    }
    //console.log(body);
    
    this._es.getIds(body).subscribe(res =>{
      /* res.res1[0].idEmpleado; */
    })
  }

  guardarPermiso(){
    /* console.log(this.formNewPermiso.controls['firma']) */;
    this.consultarIds();
    
    if (this.formNewPermiso.invalid) {
      alert('Diligencie todos los campos!!')
      return Object.values(this.formNewPermiso.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    console.log(this.formNewPermiso.value);
    alert('Permiso creado!!')
    let body = {

    }
    
  }
}
