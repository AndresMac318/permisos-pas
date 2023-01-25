import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class DetalleSolicitudComponent implements OnInit, AfterViewInit {

  idSolicitud!: number;
  solicitud!:any;
  infoAdmin!: any;
  fly!: boolean;

  newSalida: any;
  newEntrada: any;

  @ViewChild('signatureSolicita')
  public signatureObject!: SignatureComponent;
  
  @ViewChild('signatureAdmin')
  public signatureObject2!: SignatureComponent;

  constructor(
    private router: ActivatedRoute, 
    private _permisoS: PermisosService,
    private _empleadosS: EmpleadoService
    ) {
    this.router.params.subscribe(params => {
      this.idSolicitud = params['id'];
      console.log(this.idSolicitud);
    });
    this.getSolicitud();
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //this.cargarFirmas(this.solicitud.permiso.firma, this.infoAdmin.admin.firma);
  }



  async getSolicitud(){
    this.solicitud = await this._permisoS.getPermisoE(this.idSolicitud);
    this.infoAdmin = await this._empleadosS.getAdminID(this.solicitud.permiso.idAdministrativo);


    console.log(this.solicitud);
    console.log(this.infoAdmin);
    
    let fechasal = Date.parse(this.solicitud.permiso.fsalida);
    let fechaent = Date.parse(this.solicitud.permiso.fentrada);
    let firma1 = await this.solicitud.permiso.firma;
    let firma2 = await this.infoAdmin.admin.firma;
    
    console.log(firma1);
    console.log(firma2);
    
    //this.cargarFirmas(firma1+'', firma2+'');
    
    //this.signatureObject.load(this.solicitud.permiso.firma!);
    //this.signatureObject2.load(this.infoAdmin.admin.firma!);

    this.newSalida = moment.utc(fechasal).format('YYYY-MM-DD HH:MM:SS');
    this.newEntrada = moment.utc(fechaent).format('YYYY-MM-DD HH:MM:SS');
    this.fly = true;
    //console.log(this.solicitud);
    
  }

  cargarFirmas(firmaE: any, firmaA: any){
    console.log(firmaE);
    
    if (firmaE === null || firmaE === undefined) {
      alert('no se cargaron');
      return;
    }
    this.signatureObject.load(firmaE);
    this.signatureObject2.load(firmaA);
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
