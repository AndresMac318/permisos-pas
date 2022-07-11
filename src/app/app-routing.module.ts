import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AddEmpleadoComponent } from './views/dashboard/empleados/add-empleado/add-empleado.component';
import { EmpleadosComponent } from './views/dashboard/empleados/empleados.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', 
    component: DashboardComponent, 
    children: [
      { path:'empleados', component: EmpleadosComponent },
      { path:'empleado-add', component: AddEmpleadoComponent }
    ]
  },
  { path: '**', pathMatch:'full', redirectTo:'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
