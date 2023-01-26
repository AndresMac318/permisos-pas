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

  //idAdmin = new BehaviorSubject<number>(0);
  //idEmpleado = new BehaviorSubject<number>(0);
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

    /* this._es.getAdmins().pipe(
      map(admins => {
        let cedulasAdmin: any;
        admins.forEach((admin: any) => {
          cedulasAdmin.push(admin.cedula);
        });
        admins = cedulasAdmin;
        this.documentsAdmin = admins;
      })
    ).subscribe(); */
    
    // Cargar motivos
    this._ms.getMotivos().subscribe(res => {
      this.motivos = res;
    });
    this.crearFormulario();
  }

  ngOnInit(): void {
    //console.log('oninit:');
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
        
        //console.log('cedula activo', this.userActive.cedula);
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
      //console.log('data admin cargada');
      //console.log(this.userActive);
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
      //console.log('se carga la cedula del admin:');  
      //console.log(res.cedula);
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

    console.log(bodyPermiso);
    

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
    /* let body = {
      opcion: 2,
      nombre: '',
      //id_huella: ''
    } */
    this.respuestaHuella = await this._ps.getDataFinger();
    //console.log(this.respuestaHuella[0]);

    const newCedula = await this.respuestaHuella[0].cedula;

    this.formNewPermiso.controls['cedSolicita'].setValue(newCedula);

    this.signatureObject.load(this.userActive.firma);
    this.signatureObject2.load(this.respuestaHuella[0].firma);
    
    
    /* var opcion = 2;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost/html/php/queryRead.php", true); 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Response
        var data = this.responseText;
        var lol = JSON.parse(data);
        //var id_ = lol[0].cedula;

        //aqui se imprime la respuesta de la persona qque ponga la ultima huella si tiene la huella asignada
        console.log(lol[0])
  
      }
    };
    var data =  { opcion: opcion, nombre:'',id_huella:'' };
    xhttp.send(JSON.stringify(data)); */
  }
}
