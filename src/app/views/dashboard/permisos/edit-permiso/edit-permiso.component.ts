import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Motivo } from 'src/app/models/motivo';
import * as moment from 'moment';
import { PermisosService } from 'src/app/services/permisos/permisos.service';
import { MotivosService } from 'src/app/services/motivos/motivos.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-permiso',
  templateUrl: './edit-permiso.component.html',
  styleUrls: ['./edit-permiso.component.css']
})
export class EditPermisoComponent implements OnInit {

  formEditPermiso!: FormGroup;

  idPermiso!: number;
  permiso: any;
  motivos: Motivo[] = [];
  fechaNow = new Date();
  fecha = moment.utc(this.fechaNow.setMinutes(this.fechaNow.getMinutes() + this.fechaNow.getTimezoneOffset())).format('YYYY-MM-DD HH:MM:SS');

  constructor(
    private actRouter: ActivatedRoute,
    private location: Location,
    private _permisoS: PermisosService,
    private _motivoS: MotivosService,
    private fb: FormBuilder,
  ) {
    this.actRouter.params.subscribe(params=>{
      this.idPermiso = params['id'];
    });
    this._motivoS.getMotivos().subscribe(res => {
      this.motivos = res;
    });
    this.crearFormulario();
  }
  
  ngOnInit(): void {
    this.cargarFormulario();
  }

  async obtenerPermiso(){
    let infoPermiso:any;
    infoPermiso = await this._permisoS.getPermiso(this.idPermiso);
    this.permiso = infoPermiso.solicitudE;
    console.log(this.permiso);
  }

  crearFormulario(){
    this.formEditPermiso = this.fb.group({
      cedAutoriza: ['', [Validators.required, Validators.minLength(7)]],
      cedSolicita: ['', [Validators.required, Validators.minLength(7)]],
      codMotivo: ['', [Validators.required]],
      fsalida: ['', [Validators.required]],
      fentrada: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      observaciones: [''],
    })
  }

  async cargarFormulario(){
    this.permiso = await this._permisoS.getPermiso(this.idPermiso)
    let newFecha1 = Date.parse(this.permiso.solicitudE.fsalida);
    let newFecha2 = Date.parse(this.permiso.solicitudE.fentrada);
    let newSalida =  moment.utc(newFecha1).format('YYYY-MM-DD HH:MM:SS');
    let newEntrada =  moment.utc(newFecha2).format('YYYY-MM-DD HH:MM:SS');
    
    this.formEditPermiso.controls['cedAutoriza'].setValue(this.permiso.solicitudE.idAdministrativo);
    this.formEditPermiso.controls['cedSolicita'].setValue(this.permiso.solicitudE.idEmpleado);
    this.formEditPermiso.controls['codMotivo'].setValue(this.permiso.solicitudE.codMotivo);
    this.formEditPermiso.controls['fsalida'].setValue(newSalida);
    this.formEditPermiso.controls['fentrada'].setValue(newEntrada);
    this.formEditPermiso.controls['estado'].setValue(this.permiso.solicitudE.estado);
    this.formEditPermiso.controls['observaciones'].setValue(this.permiso.solicitudE.observaciones);
  }

  guardarPermiso(){

    if (this.formEditPermiso.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Diligencie todos los campos!!',
      });
      return Object.values(this.formEditPermiso.controls).forEach(control => {
        if (control instanceof UntypedFormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    let body = {
      idAministrativo: this.permiso.solicitudE.idAdministrativo,
      idEmpleado: this.permiso.solicitudE.idEmpleado,
      fpermiso: moment.utc(this.fechaNow.setMinutes(this.fechaNow.getMinutes() + this.fechaNow.getTimezoneOffset())).format('YYYY-MM-DD'),
      fsalida: this.formEditPermiso.controls['fsalida'].value,
      fentrada: this.formEditPermiso.controls['fentrada'].value,
      observaciones: this.formEditPermiso.controls['observaciones'].value,
      codMotivo: this.formEditPermiso.controls['codMotivo'].value,
      estado: this.formEditPermiso.controls['estado'].value,
    }
    console.log(body);
    
    this._permisoS.editPermiso(this.idPermiso, body).subscribe((res: any) => {
      if (res.status === false) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Consulte con el administrador!!',
          footer: res.msg
        });
      }
      Swal.fire({
        icon: 'success',
        title: 'Good!',
        text: 'Permiso Actualizado!',
      });
    })
    this.location.back();
  }

  

}
