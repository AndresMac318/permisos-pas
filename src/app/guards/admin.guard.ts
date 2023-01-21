import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth/auth.service';
import { DashboardComponent } from '../views/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private _authService: AuthService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
      
    if(sessionStorage.getItem('rol') === 'admin'){
      return true;
    }
    this.router.navigateByUrl('/login');
    sessionStorage.clear();
    return false;    
  }
  
  
}
