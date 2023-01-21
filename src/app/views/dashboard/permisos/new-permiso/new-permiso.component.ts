import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
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
  formNewPermiso!: UntypedFormGroup;
  fechaNow = new Date();
  bandera = false;
  fecha = moment.utc(this.fechaNow.setMinutes(this.fechaNow.getMinutes() + this.fechaNow.getTimezoneOffset())).format('YYYY-MM-DD HH:MM:SS')
  firma54!:string;

  //idAdmin = new BehaviorSubject<number>(0);
  //idEmpleado = new BehaviorSubject<number>(0);
  idNew:any;
  bodyPermiso: any;

  motivos: Motivo[]= [];
  documentsNum: any;

  @ViewChild('signatureAutoriza')
  public signatureObject!: SignatureComponent;
  
  @ViewChild('signatureSolicita')
  public signatureObject2!: SignatureComponent; 

  constructor(
    private fb: UntypedFormBuilder, 
    private _es: EmpleadoService, 
    private _ms: MotivosService, 
    private _ps: PermisosService
  ) {
    /* this.islogg.subscribe(res=>{
      let idsess=sessionStorage.getItem('id');
      if(idsess){
        this.userActive.cedula;
      }
    }) */
    console.log('constructor:');
    
    // Cargar motivos
    this._ms.getMotivos().subscribe(res => {
      this.motivos = res;
    });
    
  }

  ngOnInit(): void {
    console.log('oninit:');
    this.cargarUserLog();  
    this.crearFormulario();
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
        //console.log(this.documentsNum);
      })
    ).subscribe();
  }

  //carga info del user loggeado "admin"
  cargarUserLog(){
    let body = {
      id: sessionStorage.getItem('id'),
      rol: sessionStorage.getItem('rol')
    }
    // !retorna datos de la persona
    this._ps.getSolicitante(body).subscribe(res=>{
      this.userActive = res;
      console.log('useractivo ok');
      console.log(this.userActive);
      this.cargarFormulario(res);
    });
  }

  /* open(): void {
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
      cedulaAdmin: this.formNewPermiso.controls['cedAutoriza'].value,// pasar cedula o id del admin logueado
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
         //realizate 
         console.log(res);
         
        });
      }
    })
    
  } */

  //? crea los campos del formulario
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

  // ? Carga la cedula del admin en el formulario
  cargarFormulario(res:ResUser){
    if(res){
      console.log('se carga la cedula del admin:');  
      console.log(res.cedula);
      this.formNewPermiso.controls['cedAutoriza'].setValue(res.cedula);
    }
  }

  

  
  async guardarPermiso(){
    /* if (!this.bandera) {
      alert('Firme el formulario para guardar el permiso');
      return;
    }*/

    // ? verifica validez del formulario
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

    // ? verifica existencia de la cedula del empleado
    if(!this.documentsNum.includes(this.formNewPermiso.controls['cedSolicita'].value)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No existe un empleado con ese número de documento!',
      });
      return;
    }


    /* const getCedulaEmpleado = () => {
      
      let cedulas = {
        cedulaAdmin: this.formNewPermiso.controls['cedAutoriza'].value,// pasar cedula o id del admin logueado
        cedulaEmpleado: this.formNewPermiso.controls['cedSolicita'].value
      }

      console.log(cedulas);
      
  
      //this._ps.getIds(cedulas).then(async res => {
      //  console.log(res)
      //  //await this.idEmpleado = res?.EmpleadoRows
      //  //await this.idAdmin = res?.idAdministrativo
      //})
      //
      // this._ps.getIds(cedulas).subscribe( res => {
      //  this.idEmpleado.next(res.EmpleadoRows);  
      //  this.idAdmin.next(res.idAdministrativo);
      //  this.bandera = true;
      //}); 

    } */
    //await getCedulaEmpleado();
    
    let cedulas = {
      cedulaAdmin: this.formNewPermiso.controls['cedAutoriza'].value,// pasar cedula o id del admin logueado
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
      Swal.fire(
        'Good!',
        'El permiso fue creado!',
        'success'
      )
    }); 

    //let idempleado = 0;

    /* this.idEmpleado.subscribe( res => {
      if(res > 0){
        idempleado = res;
        console.log('idempleado',res);
      }
    }); */

    /* let body: Permiso = {
      idAdministrativo: this.userActive.idAdministrativo,
      //idAdministrativo: idadmin,
      idEmpleado: idempleado,
      fpermiso: moment.utc(this.fechaNow.setMinutes(this.fechaNow.getMinutes() + this.fechaNow.getTimezoneOffset())).format('YYYY-MM-DD'),
      fsalida: this.formNewPermiso.controls['fsalida'].value,
      fentrada: this.formNewPermiso.controls['fentrada'].value,
      observaciones: this.formNewPermiso.controls['observaciones'].value,
      codMotivo: this.formNewPermiso.controls['codMotivo'].value,
      estado: this.formNewPermiso.controls['estado'].value,
    } */

  }

  consulta_persona() {
    var opcion = 3;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost/html/php/queryRead.php", true); 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Response
        var data = this.responseText;
        var lol = JSON.parse(data);
        var id_ = lol[0].cedula;
        console.log(lol)
      }
    };
    var data =  { opcion: opcion, nombre:'',id_huella:'' };
    xhttp.send(JSON.stringify(data));
  }
}
