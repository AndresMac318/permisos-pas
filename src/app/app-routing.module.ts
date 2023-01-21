import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminGuard } from './guards/admin.guard';
import { EmpleadosGuard } from './guards/empleados.guard';
import { GeneralGuard } from './guards/general.guard';
import { DetalleSolicitudComponent } from './views/dashboard-e/detalle-solicitud/detalle-solicitud.component';
import { PerfilComponent } from './views/dashboard-e/perfil/perfil.component';
import { SolicitudesComponent } from './views/dashboard-e/solicitudes/solicitudes.component';
import { AddAdminComponent } from './views/dashboard/admins/add-admin/add-admin.component';
import { AdminsComponent } from './views/dashboard/admins/admins.component';
import { EditAdminComponent } from './views/dashboard/admins/edit-admin/edit-admin.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AddEmpleadoComponent } from './views/dashboard/empleados/add-empleado/add-empleado.component';
import { EditEmpleadoComponent } from './views/dashboard/empleados/edit-empleado/edit-empleado.component';
import { EmpleadosComponent } from './views/dashboard/empleados/empleados.component';
import { AddMotivoComponent } from './views/dashboard/motivos/add-motivo/add-motivo.component';
import { EditMotivoComponent } from './views/dashboard/motivos/edit-motivo/edit-motivo.component';
import { MotivosComponent } from './views/dashboard/motivos/motivos.component';
import { EditPermisoComponent } from './views/dashboard/permisos/edit-permiso/edit-permiso.component';
import { NewPermisoComponent } from './views/dashboard/permisos/new-permiso/new-permiso.component';
import { PermisosComponent } from './views/dashboard/permisos/permisos.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  /* { path: 'home', component: AppComponent }, */
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [GeneralGuard],
    children: [
      { path:'empleados', component: EmpleadosComponent,canActivate: [AdminGuard] },
      { path:'empleado-add', component: AddEmpleadoComponent,canActivate: [AdminGuard] },
      { path:'empleado-edit/:id', component: EditEmpleadoComponent, canActivate: [AdminGuard]},
      { path:'admins', component: AdminsComponent ,canActivate: [AdminGuard]},
      { path:'admin-add', component: AddAdminComponent ,canActivate: [AdminGuard]},
      { path:'admin-edit/:id', component: EditAdminComponent ,canActivate: [AdminGuard]},
      { path:'permisos', component: PermisosComponent ,canActivate: [AdminGuard]},
      { path:'permisos-new', component: NewPermisoComponent ,canActivate: [AdminGuard]},
      { path:'permisos-edit/:id', component: EditPermisoComponent, canActivate: [AdminGuard]},
      { path:'motivos', component: MotivosComponent, canActivate: [AdminGuard] },
      /* { path:'motivos', component: MotivosComponent ,canActivate: [AdminGuard]}, */
      { path:'motivos-add', component: AddMotivoComponent ,canActivate: [AdminGuard]},
      { path:'motivos-edit/:id', component: EditMotivoComponent ,canActivate: [AdminGuard]},
      { path:'perfil', component: PerfilComponent},
      { path:'solicitudes', component: SolicitudesComponent},
      { path:'detalle/:id', component: DetalleSolicitudComponent},
    ],
  },
  { path: '**', pathMatch:'full', redirectTo:'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
