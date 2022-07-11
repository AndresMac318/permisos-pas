import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpleadosComponent } from './empleados/empleados.component';
import { AddEmpleadoComponent } from './empleados/add-empleado/add-empleado.component';

import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@NgModule({
  declarations: [
    EmpleadosComponent,
    AddEmpleadoComponent,
    
  ],
  imports: [
    CommonModule,
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
