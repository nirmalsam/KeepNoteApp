import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  loginForm: FormGroup;
  submitMessage: string;

  constructor(private authService: AuthenticationService,
    private routerService: RouterService, private formbuilder: FormBuilder) {

    this.loginForm = formbuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  ngOnInit() {
  }

  loginSubmit() {
    this.authService.authenticateUser({
      userId: this.username.value,
      userPassword: this.password.value
    }).subscribe(res => {
      this.authService.setBearerToken(res['token'], this.username.value);
      this.routerService.routeToDashboard();
    },
      err => {
        console.log(err);
        alert(err.error.message);
        this.submitMessage = err.error.message;
      });
  }
}
