import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { Motivo } from 'src/app/models/motivo';
import { MotivosService } from 'src/app/services/motivos/motivos.service';
import { Permiso } from 'src/app/models/permiso';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { PermisosService } from 'src/app/services/permisos/permisos.service';
import Swal from 'sweetalert2';
import { ResUser } from 'src/app/models/resUser';

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
  formNewPermiso!: FormGroup;
  fechaNow = new Date();
  bandera = false;
  fecha = moment.utc(this.fechaNow.setMinutes(this.fechaNow.getMinutes() + this.fechaNow.getTimezoneOffset())).format('YYYY-MM-DD HH:MM')
  firma54!:string;

  idAdmin = new BehaviorSubject<number>(0);
  idEmpleado = new BehaviorSubject<number>(0);

  motivos: Motivo[]= [];

  @ViewChild('signatureAutoriza')
  public signatureObject!: SignatureComponent;
  
  @ViewChild('signatureSolicita')
  public signatureObject2!: SignatureComponent; 

  constructor(private fb: FormBuilder, private _es: EmpleadoService, private _ms: MotivosService, private _ps: PermisosService) {
    /* this.islogg.subscribe(res=>{
      let idsess=sessionStorage.getItem('id');
      if(idsess){
        this.userActive.cedula;
      }
    }) */
    console.log('constrru');
    
    this._ms.getMotivos().subscribe(res=>{
      this.motivos = res;
    })
    
    
    
  }

  ngOnInit(): void {
    console.log('oninit');
    this.cargarUserLog();  
    this.crearFormulario();
  
    
  }

  cargarUserLog(){
    let body = {
      id: sessionStorage.getItem('id'),
      rol: sessionStorage.getItem('rol')
    }
    this._ps.getSolicitante(body).subscribe(res=>{
      this.userActive=res;
      console.log(this.userActive);
      this.cargarFormulario(res);
    });
  }

  open(): void {
    let sign = this.userActive.firma;
    this.signatureObject.load(sign);
    //let sign2 = this.userSolicita.firma;
    //this.signatureObject2.load(sign2);
    if(this.formNewPermiso.controls['cedSolicita'] == null || this.formNewPermiso.controls['cedSolicita'].invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La cedula del solicitante que intenta ingresar no se encuentra en el sistema',
      })
      return;
    }
    let body = {
      cedulaAdmin: this.formNewPermiso.controls['cedAutoriza'].value,/* pasar cedula o id del admin logueado */
      cedulaEmpleado: this.formNewPermiso.controls['cedSolicita'].value
    }
    
    this._ps.getIds(body).subscribe(res=>{
      this.idEmpleado.next(res.EmpleadoRows);  
      this.idAdmin.next(res.idAdministrativo);
      this.bandera = true;
  
    })

    let idemp;
    this.idEmpleado.subscribe(res => {
      if(res>0){
        idemp = res;

        let body2 = {
          id: idemp,
          rol: 'empleado',
        }
        
        this._ps.getSolicitante(body2).subscribe(res => {
         /* realizate */
        });
      }
    })
    
  }

  crearFormulario(){
    this.formNewPermiso = this.fb.group({
      cedAutoriza: ['', [Validators.required, Validators.minLength(7)]],
      cedSolicita: ['', [Validators.required, Validators.minLength(7)]],
      codMotivo: ['', [Validators.required]],
      fsalida: ['', [Validators.required]],
      fentrada: ['', [Validators.required]],
      observaciones: [''],
    })
  }

  cargarFormulario(res:ResUser){
    if(res){
      console.log(res.cedula);
      
      console.log('cargar form');  
      this.formNewPermiso.controls['cedAutoriza'].setValue(res.cedula);

    }
    
  }

  guardarPermiso(){
    if (!this.bandera) {
      alert('Firme el formulario para guardar el permiso');
      return;
    }
        
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

    
    //console.log('imprime formulario', this.formNewPermiso.value);


    let idadmin=0;
    let idempleado=0;
    this.idAdmin.subscribe(res => {
      if(res>0){
        idadmin = res
        console.log(res);
      }
      
    })
    this.idEmpleado.subscribe(res => {
      if(res>0){
        idempleado = res
        console.log(res);
      }
    })

    let body: Permiso = {
      idAdministrativo: idadmin,
      idEmpleado: idempleado,
      fpermiso: moment.utc(this.fechaNow.setMinutes(this.fechaNow.getMinutes() + this.fechaNow.getTimezoneOffset())).format('YYYY-MM-DD'),
      fsalida: this.formNewPermiso.controls['fsalida'].value,
      fentrada: this.formNewPermiso.controls['fentrada'].value,
      observaciones: this.formNewPermiso.controls['observaciones'].value,
      codMotivo: this.formNewPermiso.controls['codMotivo'].value,
    }
    console.log(body);
    this._ps.createPermiso(body).subscribe(res=>{
      //console.log(res);
      Swal.fire(
        'Good!',
        'El permiso fue creado!',
        'success'
      )
    })
    
  }
}
