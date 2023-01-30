import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Motivo } from 'src/app/models/motivo';
import { MotivosService } from 'src/app/services/motivos/motivos.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-motivo',
  templateUrl: './add-motivo.component.html',
  styleUrls: ['./add-motivo.component.css']
})
export class AddMotivoComponent implements OnInit {

  formAddMotivo!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder, 
    private _ms: MotivosService,
    private location: Location,
    ) {
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Diligencie todos los campos!!',
      });
      return Object.values(this.formAddMotivo.controls).forEach(control => {
        if (control instanceof UntypedFormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    const body : Motivo = {
      codMotivo: this.formAddMotivo.controls['codMotivo'].value,
      detalleMotivo: this.formAddMotivo.controls['detalle'].value,
      descripcion: this.formAddMotivo.controls['descripcion'].value,
    };
    this._ms.createMotivo(body).subscribe(res => {
      Swal.fire(
        'Good!',
        'El motivo fue creado!',
        'success'
      );
      this.location.back();
    })    
  }

}
