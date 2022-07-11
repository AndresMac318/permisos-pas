import { Component, createPlatform, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-add-empleado',
  templateUrl: './add-empleado.component.html',
  styleUrls: ['./add-empleado.component.css']
})
export class AddEmpleadoComponent implements OnInit {

  formAddEmpleado!: FormGroup;

  roles : string[] = ['talento humano', 'jefe inmediato', 'empleado']; 

  @ViewChild('signatureComponent')
  public signatureObject!: SignatureComponent; 
  
  @ViewChild('clearbuttoncomponent')
  public clearButtonObject!: ButtonComponent;
  
  @ViewChild('savebuttoncomponent')
  public saveButtonObject!: ButtonComponent;

  constructor(private fb: FormBuilder) {
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

  crearFormulario(){
    this.formAddEmpleado = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      cedula: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      rol: ['', Validators.required],
      firma: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  public saveSignature(){
    /* this.signatureObject.save(); */
    let base64: string = this.signatureObject.getSignature();
    if (base64 == null || base64==="") {
      alert('Ingrese su firma');
    }
    this.formAddEmpleado.get('firma')?.setValue(base64);
    /* console.log(base64); */
  }
  
  guardarEmpleado(){
    console.log(this.formAddEmpleado.controls['firma']);
    if (this.formAddEmpleado.invalid) {
      alert('Diligencie todos los campos!!')
      return Object.values(this.formAddEmpleado.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
  }

}
