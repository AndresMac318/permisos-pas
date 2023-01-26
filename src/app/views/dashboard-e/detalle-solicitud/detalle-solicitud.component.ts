import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermisosService } from 'src/app/services/permisos/permisos.service';
import * as moment from 'moment';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.css']
})
export class DetalleSolicitudComponent implements OnInit {

  idSolicitud!: number;

  solicitud!:any;
  infoAdmin!: any;
  fly!: boolean;

  nonAutorized = true;

  newSalida!: any;
  newEntrada!: any;

  firmaAutoriza!: any;
  firmaSolicita!: any;

  fechaNow = new Date();
  dateHeader = moment.utc(this.fechaNow.setMinutes(this.fechaNow.getMinutes() + this.fechaNow.getTimezoneOffset())).format('DD-MM-YYYY');

  @ViewChild('signatureAutoriza')
  public signatureObject!: SignatureComponent;
  
  @ViewChild('signatureSolicita')
  public signatureObject2!: SignatureComponent;

  constructor(
    private router: ActivatedRoute, 
    private _permisoS: PermisosService,
    private _empleadosS: EmpleadoService
    ) {
  
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.idSolicitud = params['id'];
      this.getSolicitud();
    });
    // realizar loaders mientras se carga la info de la data
  }

  async getSolicitud(){
    this.solicitud = await this._permisoS.getPermisoE(this.idSolicitud);
    this.infoAdmin = await this._empleadosS.getAdminID(this.solicitud.permiso.idAdministrativo);

    console.log(this.solicitud);
    console.log(this.infoAdmin);


    if (this.solicitud.permiso.estado === 'no aprobado') {
      this.nonAutorized = false;
    }
    
    let fechasal = Date.parse(this.solicitud.permiso.fsalida);
    let fechaent = Date.parse(this.solicitud.permiso.fentrada);

    this.newSalida = moment.utc(fechasal).format('YYYY-MM-DD HH:MM:SS');
    this.newEntrada = moment.utc(fechaent).format('YYYY-MM-DD HH:MM:SS');
    this.fly = true;
    this.cargarFirmas();
  }  

  cargarFirmas(){
    this.firmaAutoriza = this.infoAdmin.admin.firma; 
    this.firmaSolicita = this.solicitud.permiso.firma;   
    this.signatureObject.load(this.infoAdmin.admin.firma);
    this.signatureObject2.load(this.firmaSolicita);
    /* this.signatureObject.load(this.firmaAutoriza);
    this.signatureObject2.load(this.firmaSolicita); */
  }

  printer() {
    const printContent = document.getElementById("print");
    const WindowPrt = window.open('', '', 'left=0,top=50,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt?.document.write(printContent!.innerHTML);
    WindowPrt?.document.close();
    WindowPrt?.focus();
    WindowPrt?.print();
    //WindowPrt?.close();
    this.fly=true;
  }

}
