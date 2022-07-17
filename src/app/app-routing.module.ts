import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddAdminComponent } from './views/dashboard/admins/add-admin/add-admin.component';
import { AdminsComponent } from './views/dashboard/admins/admins.component';
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
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', 
    component: DashboardComponent, 
    children: [
      { path:'empleados', component: EmpleadosComponent },
      { path:'empleado-add', component: AddEmpleadoComponent },
      { path:'empleado-edit', component: EditEmpleadoComponent },
      { path:'admins', component: AdminsComponent },
      { path:'admin-add', component: AddAdminComponent },
      { path:'permisos', component: PermisosComponent },
      { path:'permisos-new', component: NewPermisoComponent },
      { path:'permisos-edit', component: EditPermisoComponent },
      { path:'motivos', component: MotivosComponent },
      { path:'motivos-add', component: AddMotivoComponent },
      { path:'motivos-edit/:id', component: EditMotivoComponent },
    ]
  },
  { path: '**', pathMatch:'full', redirectTo:'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
