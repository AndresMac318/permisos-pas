import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResLogin } from 'src/app/models/ResLogin';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: UntypedFormGroup;

  constructor(
    private _auths: AuthService, 
    private fb: UntypedFormBuilder, 
    private router: Router
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    })
  }

  Ingresar(){
    
    if (this.formLogin.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son requerdidos, ingrese nuevamente!',
        /* footer: '<a href="">Why do I have this issue?</a>' */
      });
      
      return Object.values(this.formLogin.controls).forEach(control => {
        if (control instanceof UntypedFormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    
    const body : {email: string, password: string} = {
      email: this.formLogin.controls['email'].value,
      password: this.formLogin.controls['password'].value,
    }

    this._auths.login(body).subscribe(res => {
      
      console.log(res);
      if(res.ok === false){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciales incorrectas!, ingrese nuevamente',
        });
        return;
      }

      if (res.user.rol === 'empleado') {
        console.log('es empleado');
        sessionStorage.setItem('session_token', 'dCsd%Rg*f2?03DeE');
        sessionStorage.setItem('id', res.user.idEmpleado+'');
        sessionStorage.setItem('rol', res.user.rol);
        localStorage.setItem('cod', res.user.cedula);
        this._auths.logueado.next(true);
        this.router.navigateByUrl('dashboard/solicitudes');
      }

      if (res.user.idAdministrativo) {
        console.log('es admin');
        
        sessionStorage.setItem('session_token', 'dCsd%Rg*f2?03DeE');
        sessionStorage.setItem('id', res.user.idAdministrativo+'');
        sessionStorage.setItem('rol',res.user.rol);
        this._auths.logueado.next(true);
        this.router.navigateByUrl('/dashboard/empleados');
      }
      
    })
    
  }
}
