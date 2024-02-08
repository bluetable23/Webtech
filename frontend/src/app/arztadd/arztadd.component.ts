import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../shared/doctor';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Location } from '@angular/common';
import { ConfirmComponent } from '../register/confirm/confirm.component';

import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  headline: string;
  info: string;
}


@Component({
  selector: 'app-arztadd',
  templateUrl: './arztadd.component.html',
  styleUrls: ['./arztadd.component.css']
})
export class ArztaddComponent {
  registerForm = new FormGroup({
    arztnr: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    fullname: new FormControl('', Validators.required),
    strasnr: new FormControl('', Validators.required),
    telenr: new FormControl('', [
      Validators.required,
    
      Validators.minLength(8)
    ]),
    sprechzeiten: new FormControl('', Validators.required)

  });
  doctor!: Doctor;
  
 
  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private location: Location,
    private router: Router, public dialog: MatDialog
  ) { }

  
  onSubmit(): void {
    const values = this.registerForm.value;
    this.doctor = {
      arztnr: values.arztnr!,
      fullname: values.fullname!,
      strasnr: values.strasnr!,
      telenr: values.telenr!,
      sprechzeiten: values.sprechzeiten!
    };
  
    console.log(this.doctor);
    this.bs.registerDoctor(this.doctor).subscribe({
        next: (response) => {
          console.log('response', response);
        },
        error: (err) => {
          console.log('error', err.error.error);
          this.openDialog({ headline: "Fehler", info: "Registrierung nicht möglich" });
        },
        complete: () => {
          console.log('register completed');
          this.openDialog({ headline: "Erfolg", info: "Registrierung erfolgreich" });
        }
    });
  }
  
  
  cancel(): void {
    this.location.back();
  }


  openDialog(data: DialogData) {
    this.dialog.open(ConfirmComponent, { data });
}
  


}
