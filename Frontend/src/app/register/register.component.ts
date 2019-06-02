import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userId = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  firstName = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  lastName = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  userPassword = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  userRole = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  regForm: FormGroup;
  submitMessage: string;

  constructor(private authService: AuthenticationService,
    private formbuilder: FormBuilder) {
    this.regForm = formbuilder.group({
      userId: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      userPassword: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      userRole: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });
  }

  ngOnInit() {
  }

  regSubmit() {
    let user = {
      userId: this.userId.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      userPassword: this.userPassword.value,
      userRole: this.userRole.value
    }
    console.log(user);
    this.authService.register(user).subscribe((res : any) => {
      console.log("Success" , res);
      alert(res.message);
    }, err => {
      console.log("Failure" , err);
      alert(err.error);
    })
  }

}
