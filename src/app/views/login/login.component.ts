import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  error: HttpErrorResponse | undefined;
  errorMessage: string | undefined;
  isInvalidMessage: boolean = false;

  mySuscription: Subscription | undefined;

  constructor(private formBuilder: FormBuilder, private service: APIService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.onSubmit();
  }

  //Validando que el email y el password sean requeridas con ciertos caracteres y longitud
  initForm(){
    this.formLogin = this.formBuilder.group({
      email: ['',[Validators.required, Validators.pattern(/^[\w.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/)]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    })
  }

  //Para resetear el form
  resetForm(){
    this.formLogin.reset()
  }

  //Oprimir el botón de ingresar y manejar respuesta o errores
  onSubmit(){
    const emailControl = this.formLogin.get('email')?.value;
    const passwordControl = this.formLogin.get('password')?.value;
    

    this.mySuscription = this.service.getlogIn(emailControl, passwordControl).subscribe({
      next: (userResponse) => {
        if(userResponse.user){
          localStorage.clear();
          localStorage.setItem('accessToken', userResponse.accessToken);
          this.router.navigate(['/orders']);
        }
      },
      error: (errorResponse) => {
        this.error = errorResponse;
        if(this.error instanceof HttpErrorResponse){
          this.isInvalidMessage = true;
          this.errorMessage = (errorResponse.error === 'Cannot find user' || errorResponse.error === 'Incorrect password')?
          'Credenciales inválidas. Intenta nuevamente.'
          : this.errorMessage = '';
          localStorage.clear(); //Desde un inicio me dice error 400, automáticamente se borra mi localStorage y no queda ningún token guardado.
        }
      }
  })
    this.resetForm();
}

//Me desuscribo del observable para no seguir consumiendo recursos de la API.  
ngOnDestroy() {
  if (this.mySuscription) {
    this.mySuscription.unsubscribe();
  }
}

}
