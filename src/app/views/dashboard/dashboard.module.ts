import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EmpleadosComponent } from './empleados/empleados.component';
import { AddEmpleadoComponent } from './empleados/add-empleado/add-empleado.component';


import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { PermisosComponent } from './permisos/permisos.component';
import { NewPermisoComponent } from './permisos/new-permiso/new-permiso.component';
import { MotivosComponent } from './motivos/motivos.component';
import { EditEmpleadoComponent } from './empleados/edit-empleado/edit-empleado.component';
import { EditPermisoComponent } from './permisos/edit-permiso/edit-permiso.component';
import { AddMotivoComponent } from './motivos/add-motivo/add-motivo.component';
import { EditMotivoComponent } from './motivos/edit-motivo/edit-motivo.component';
import { AdminsComponent } from './admins/admins.component';
import { AddAdminComponent } from './admins/add-admin/add-admin.component';

@NgModule({
  declarations: [
    EmpleadosComponent,
    AddEmpleadoComponent,
    PermisosComponent,
    NewPermisoComponent,
    MotivosComponent,
    EditEmpleadoComponent,
    EditPermisoComponent,
    AddMotivoComponent,
    EditMotivoComponent,
    AdminsComponent,
    AddAdminComponent,
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SignatureModule,
    ButtonModule
  ],
  exports: [
    EmpleadosComponent,
    AddEmpleadoComponent,
  ]
})
export class DashboardModule { }
