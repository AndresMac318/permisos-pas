import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { Motivo } from 'src/app/models/motivo';
import { MotivosService } from 'src/app/services/motivos/motivos.service';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { PermisosService } from 'src/app/services/permisos/permisos.service';
import Swal from 'sweetalert2';
import { ResUser } from 'src/app/models/resUser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-permiso',
  templateUrl: './new-permiso.component.html',
  styleUrls: ['./new-permiso.component.css']
})
export class NewPermisoComponent implements OnInit {

  islogg = new BehaviorSubject<number>(0);

  userActive!:ResUser;
  userSolicita!: ResUser;
  userPermiso!:ResUser;
  formNewPermiso!: UntypedFormGroup;
  fechaNow = new Date();
  bandera = false;
  fecha = moment.utc(this.fechaNow.setMinutes(this.fechaNow.getMinutes() + this.fechaNow.getTimezoneOffset())).format('YYYY-MM-DD HH:MM:SS')
  firma54!:string;

  respuestaHuella!: any;

  bodyCargar!: any;

  idNew:any;
  bodyPermiso: any;

  motivos: Motivo[]= [];
  documentsNum: any;
  documentsAdmin: any;

  @ViewChild('signatureAutoriza')
  public signatureObject!: SignatureComponent;
  
  @ViewChild('signatureSolicita')
  public signatureObject2!: SignatureComponent; 

  constructor(
    private fb: UntypedFormBuilder, 
    private _es: EmpleadoService, 
    private _ms: MotivosService, 
    private _ps: PermisosService,
    private location: Location
  ) {
    
    this.bodyCargar = {
      id: sessionStorage.getItem('id'),
      rol: sessionStorage.getItem('rol')
    }


    this._ms.getMotivos().subscribe(res => {
      this.motivos = res;
    });
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.cargarUserLog();  
    this.obtenerCedulas();
  }

  obtenerCedulas(){
    this._es.getCedulas().pipe(
      map( personas => {
        let cedulas: any = [];
        personas.forEach(persona => {
          cedulas.push(persona.cedula);
        });
        personas = cedulas;
        this.documentsNum = personas;
        this.documentsNum.push(this.userActive.cedula);        
      })
    ).subscribe();
  }

  cargarUserLog(){
    
    this._ps.getSolicitante(this.bodyCargar).subscribe(res=>{
      this.userActive = res;
      this.cargarFormulario(res);
    });
  }

  crearFormulario(){
    this.formNewPermiso = this.fb.group({
      cedAutoriza: ['', [Validators.required, Validators.minLength(7)]],
      cedSolicita: ['', [Validators.required, Validators.minLength(7)]],
      codMotivo: ['', [Validators.required]],
      fsalida: ['', [Validators.required]],
      fentrada: ['', [Validators.required]],
      estado: ['', Validators.required],
      observaciones: [''],
    })
  }

  cargarFormulario(res:ResUser){
    if(res){
      this.formNewPermiso.controls['cedAutoriza'].setValue(res.cedula);
    }
  }

  async guardarPermiso(){
    if (this.formNewPermiso.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Diligencie todos los campos!!',
      });
      return Object.values(this.formNewPermiso.controls).forEach(control => {
        if (control instanceof UntypedFormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    if(!this.documentsNum.includes(this.formNewPermiso.controls['cedSolicita'].value)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No existe un empleado con ese número de documento!',
      });
      return;
    }
    
    let cedulas = {
      cedulaAdmin: this.formNewPermiso.controls['cedAutoriza'].value,
      cedulaEmpleado: this.formNewPermiso.controls['cedSolicita'].value
    }
    
    this.idNew = await this._ps.getIds(cedulas);
    
    let bodyPermiso = {
      idAdministrativo: this.userActive.idAdministrativo,
      idEmpleado: this.idNew.EmpleadoRows,
      fpermiso: moment.utc(this.fechaNow.setMinutes(this.fechaNow.getMinutes() + this.fechaNow.getTimezoneOffset())).format('YYYY-MM-DD'),
      fsalida: this.formNewPermiso.controls['fsalida'].value,
      fentrada: this.formNewPermiso.controls['fentrada'].value,
      observaciones: this.formNewPermiso.controls['observaciones'].value,
      codMotivo: this.formNewPermiso.controls['codMotivo'].value,
      estado: this.formNewPermiso.controls['estado'].value,
    }    

    this._ps.createPermiso(bodyPermiso).subscribe( res => {
      if (res.status !== true) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Consulte con el administrador!!',
        });
      }
      Swal.fire({
        icon: 'success',
        title: 'Good!',
        text: 'El permiso fue creado!',
      });
      this.location.back();
    }); 
  }

  async consulta_empleado() {
    this.respuestaHuella = await this._ps.getDataFinger();
    const newCedula = await this.respuestaHuella[0].cedula;
    this.formNewPermiso.controls['cedSolicita'].setValue(newCedula);
    this.signatureObject.load(this.userActive.firma);
    this.signatureObject2.load(this.respuestaHuella[0].firma);
  }
}
