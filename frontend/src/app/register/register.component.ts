

import { Component } from '@angular/core';
import { ConfirmComponent } from './confirm/confirm.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../shared/auth.service';

export interface DialogData {
  headline: string;
  info: string;
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    usernamea: new FormControl('', Validators.required),
    passworda: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2a: new FormControl('', [Validators.required, Validators.minLength(8)]),
    emaila: new FormControl('', [Validators.required, Validators.email]),
    rolea: new FormControl('', Validators.required)
  });
  roles = [ "admin", "user"];
  hide = true;
  
  user!: User;

  

  constructor(private auth: AuthService, public dialog: MatDialog) {}
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
 

  onSubmit(): void {
    const values = this.registerForm.value;
    this.user = {
      usernamea: values.usernamea!,
      passworda: values.passworda!,
      emaila: values.emaila!,
      rolea: values.rolea!
    };
    console.log(this.user)
    this.auth.registerUser(this.user).subscribe({
        next: (response) => {
          console.log('response', response)
          this.user = response;
       
          this.openDialog({ headline: "Erfolg", info: "User " + values.usernamea + " registriert!" });
        },
        error: (err) => {
          console.log('error', err.error.error)
          this.openDialog({ headline: "Fehler", info: "Registrierung nicht möglich" });
        },
        complete: () => console.log('register completed')
    });
    

  }

 

  openDialog(data: DialogData) {
    this.dialog.open(ConfirmComponent, { data });
}

}








