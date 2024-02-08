import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ConfirmComponent } from '../register/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  headline: string;
  info: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  loginForm = this.fb.group({
    usernamea: [null, Validators.required],
    passworda: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, public dialog: MatDialog) {}

  onSubmit(): void {
    const values = this.loginForm.value;
    const usernamea = values.usernamea;
    const passworda =  values.passworda;
    console.log('values usernamea', usernamea)
    console.log('values passworda', passworda)

    this.auth.loginUser(usernamea!, passworda!).subscribe({
       next: (response) => {
          console.log('login response',response);
          if(response.status == 201)
          {
            this.auth.getOneUser(usernamea!).subscribe(
              (response) => {
                  this.auth.login(response);
                  this.router.navigate(['/arzttable'])
              }
            )
          } else {
            console.log('kein Login - Nutzername und/oder Passwort stimmen nicht')
          }
      },
      error: (err) => {
        console.log('login error',err);
        this.openDialog({ headline: "Fehler", info: "Login nicht erfolgreich Passwort oder Nutzername falsch" });
      },
      complete: () => console.log('login completed')
    }
    )

  }

  openDialog(data: DialogData) {
    this.dialog.open(ConfirmComponent, { data });
}
}