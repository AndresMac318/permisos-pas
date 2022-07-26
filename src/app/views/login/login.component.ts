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

  constructor(private _auths: AuthService, private fb: UntypedFormBuilder, private router: Router) {
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
      })
      
      return Object.values(this.formLogin.controls).forEach(control => {
        if (control instanceof UntypedFormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    //console.log(this.formAddEmpleado.value);
    const body : {email: string, password: string} = {
      email: this.formLogin.controls['email'].value,
      password: this.formLogin.controls['password'].value,
    }

    this._auths.login(body).subscribe(res => {
      //console.log('mi',res);
      this.formLogin.reset();
      if(res){
        if(!res.idAdministrativo){
          sessionStorage.setItem('id', res.idEmpleado+'');
          sessionStorage.setItem('rol', res.rol);
          sessionStorage.setItem('cel', res.cedula+'');
          this._auths.logueado.next(true);
        }else{
          sessionStorage.setItem('id', res.idAdministrativo+'');
          sessionStorage.setItem('rol',res.rol);
          this._auths.logueado.next(true);
        }
        this.router.navigateByUrl('/dashboard/empleados');
      }else{
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o clave incorrectos!, ingrese nuevamente',
          /* footer: '<a href="">Why do I have this issue?</a>' */
        })
        
      }
      
      //controlar error de email and password 
      
      

    })
  
    
  }

}
