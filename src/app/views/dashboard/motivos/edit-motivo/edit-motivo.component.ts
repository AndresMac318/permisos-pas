import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Motivo } from 'src/app/models/motivo';
import { MotivosService } from 'src/app/services/motivos/motivos.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-motivo',
  templateUrl: './edit-motivo.component.html',
  styleUrls: ['./edit-motivo.component.css']
})
export class EditMotivoComponent implements OnInit {

  formEditMotivo!: FormGroup;
  motivo!: Motivo;
  id!: number;

  constructor(private router: ActivatedRoute, private fb: FormBuilder, private _ms: MotivosService) {
    this.crearFormulario();
    
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      
    });

    this._ms.getMotivo(this.id).subscribe(res=>{
      this.motivo = res[0];
      this.cargarFormulario();
    })
  }

  crearFormulario(){
    //console.log('crear form');
    this.formEditMotivo = this.fb.group({
      codMotivo: ['', [Validators.required]],
      detalleMotivo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    })
  }

  cargarFormulario(){
    console.log('cargar form');
    console.log(this.motivo);
    
    
    this.formEditMotivo.controls['codMotivo'].setValue(this.motivo.codMotivo);
    this.formEditMotivo.controls['detalleMotivo'].setValue(this.motivo.detalleMotivo);
    this.formEditMotivo.controls['descripcion'].setValue(this.motivo.descripcion);
  }

  guardarMotivo(){
    if(this.formEditMotivo.invalid){
      alert('Diligencie todos los campos!!');
    }
    let body: Motivo = {
      codMotivo: this.formEditMotivo.controls['codMotivo'].value,
      detalleMotivo: this.formEditMotivo.controls['detalleMotivo'].value,
      descripcion: this.formEditMotivo.controls['descripcion'].value
    }
    this._ms.updateMotivo(this.id, body).subscribe(res =>{
      Swal.fire(
        'Good!',
        'El motivo fue actualizado!',
        'success'
      )
      
    })
  }

}
