import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { title } from 'process';
import { Usuario } from 'src/app/model/usuario';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;
  meuFormGroup: FormGroup;

  constructor(
    private loginService: LoginService,
    private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario = new Usuario()

    this.meuFormGroup = this.formBuilder.group({
      email: ['email', Validators.required],
      senha: ['senha', Validators.required]

    })


  }
  fazerLogin() {

    if (this.meuFormGroup.valid) {
      console.log("Formulário válido", this.meuFormGroup.value);
      this.loginService.fazerLogin(this.usuario).subscribe(
        (data) => {
         this.router.navigate(['dashboard']);
         this.alertService.sucess("logado","Bem vindo");
         this.authService.salvaLocal(data.token);
         this.authService.loggedIn()
      },
        (httpError) => {
          this.alertService.error(httpError.error.mensagem);
        }

      )
    }  


  }

  cadastrar() {
    this.loginService.cadastrarUsuario(this.usuario).subscribe(
      secesso => this.alertService.sucess('Cadastro', 'Cadastro realizado com sucesso'),

      (httpError) => {
        this.alertService.error(httpError.error.mensagem);
      }

    )
  }

}
