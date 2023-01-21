import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DashboardModule } from './views/dashboard/dashboard.module';


import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { PerfilComponent } from './views/dashboard-e/perfil/perfil.component';
import { SolicitudesComponent } from './views/dashboard-e/solicitudes/solicitudes.component';
import { DetalleSolicitudComponent } from './views/dashboard-e/detalle-solicitud/detalle-solicitud.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    PerfilComponent,
    SolicitudesComponent,
    DetalleSolicitudComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DashboardModule,
    SignatureModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[
    SignatureModule
  ]
})
export class AppModule { }
