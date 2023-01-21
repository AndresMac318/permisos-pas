import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralGuard implements CanActivate {

  constructor(
    private router: Router,
    private _authService: AuthService
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(sessionStorage.getItem('session_token') === 'dCsd%Rg*f2?03DeE'){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
