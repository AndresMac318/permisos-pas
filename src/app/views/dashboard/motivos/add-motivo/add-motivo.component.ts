import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Motivo } from 'src/app/models/motivo';
import { MotivosService } from 'src/app/services/motivos/motivos.service';

@Component({
  selector: 'app-add-motivo',
  templateUrl: './add-motivo.component.html',
  styleUrls: ['./add-motivo.component.css']
})
export class AddMotivoComponent implements OnInit {

  formAddMotivo!: FormGroup;

  constructor(private fb: FormBuilder, private _ms: MotivosService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formAddMotivo = this.fb.group({
      codMotivo: ['', [Validators.required, Validators.minLength(3)]],
      detalle: ['', [Validators.required, Validators.minLength(10)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
    })
  }

  guardarMotivo(){
    
    if (this.formAddMotivo.invalid) {
      alert('Diligencie todos los campos!!')
      return Object.values(this.formAddMotivo.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    //console.log(this.formAddEmpleado.value);
    const body : Motivo = {
      codMotivo: this.formAddMotivo.controls['codMotivo'].value,
      detalleMotivo: this.formAddMotivo.controls['detalle'].value,
      descripcion: this.formAddMotivo.controls['descripcion'].value,
    };
    this._ms.createMotivo(body).subscribe(res => alert('motivo creado!'))
    console.log(body);
    
  }

}
