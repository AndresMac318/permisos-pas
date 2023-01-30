import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import * as moment from 'moment';
import { Motivo } from 'src/app/models/motivo';
import { ResUser } from 'src/app/models/resUser';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { MotivosService } from 'src/app/services/motivos/motivos.service';
import { PermisosService } from 'src/app/services/permisos/permisos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-solicitud',
  templateUrl: './add-solicitud.component.html',
  styleUrls: ['./add-solicitud.component.css']
})
export class AddSolicitudComponent implements OnInit {

  formNewSolicitud!: UntypedFormGroup;

  userActivo!:ResUser;
  cedulaEmp!:any;
  idEmpleado!: any;
  motivos: Motivo[]= [];
  admins: any[] = [];

  fechaNow = new Date();
  fecha = moment.utc(this.fechaNow.setMinutes(this.fechaNow.getMinutes() + this.fechaNow.getTimezoneOffset())).format('YYYY-MM-DD HH:MM:SS')

  @ViewChild('signatureSolicita')
  public signatureObject2!: SignatureComponent; 

  constructor(
    private fb: FormBuilder,
    private _ms: MotivosService,
    private _ps: PermisosService,
    private _es: EmpleadoService,
    private location: Location,
  ) {
    this.cedulaEmp = localStorage.getItem('cod');
    this.idEmpleado = sessionStorage.getItem('id');
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.getDataServices();
    this.cargarFormulario();
  }

  crearFormulario(){
    this.formNewSolicitud = this.fb.group({
      cedAutoriza: ['', [Validators.required]],
      idAdministrativo: ['', [Validators.required]],
      codMotivo: ['', [Validators.required]],
      fsalida: ['', [Validators.required]],
      fentrada: ['', [Validators.required]],
      observaciones: [''],
    })
  }

  getDataServices(){
    this._ms.getMotivos().subscribe( res => this.motivos = res );
    this._es.getEmpleado(this.cedulaEmp).subscribe( res => {this.userActivo = res;});
    this._es.getAdmins().subscribe(res=>{
      this.admins = res;     
    });
  }


  async cargarFormulario(){
    this.formNewSolicitud.controls['cedAutoriza'].setValue(this.cedulaEmp);
    const {empleado} = await this._es.getEmpleadoAsync(this.cedulaEmp);
    this.signatureObject2.load(empleado.firma) 
  }

  guardarSolicitud(){
    if (this.formNewSolicitud.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Diligencie todos los campos!!',
      });
      return Object.values(this.formNewSolicitud.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    
    let body = {
      idAdministrativo: this.formNewSolicitud.controls['idAdministrativo'].value,
      idEmpleado: this.idEmpleado,
      fpermiso: moment.utc(this.fechaNow.setMinutes(this.fechaNow.getMinutes() + this.fechaNow.getTimezoneOffset())).format('YYYY-MM-DD'),
      fsalida: this.formNewSolicitud.controls['fsalida'].value,
      fentrada: this.formNewSolicitud.controls['fentrada'].value,
      observaciones: this.formNewSolicitud.controls['observaciones'].value,
      codMotivo: this.formNewSolicitud.controls['codMotivo'].value,
      estado: 'sin revisar',
    }
    
    this._ps.createPermiso(body).subscribe(res => {
      if (res.status = true) {
        Swal.fire({
          icon: 'success',
          title: 'Good!',
          text: 'La solicitud fue creada!',
        });
        this.location.back();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al crear la solicitud, Consulte con el administrador!!',
        });
      }
    })

  }

  



}
