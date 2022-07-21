import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() log: boolean =false;
  isLogged=false;

  constructor(private router:Router, private _auth:AuthService) {    
    
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this._auth.logueado.subscribe(res=>{
      if(res==true){
        this.isLogged=true;
      }else{
        this.isLogged=false;
      }
    })
    const sesion =sessionStorage.getItem('rol');
    if(sesion !== undefined && sesion !=='' && sesion!==null ){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }

  logout(){
    this.isLogged=true;
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
    this._auth.logueado.next(false);
  }


}
