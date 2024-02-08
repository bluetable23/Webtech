
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Doctor } from '../shared/doctor';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: string = '';
  doctor!: Doctor;
  form = new FormGroup({
    fullnameControl : new FormControl<string>(''),
    strasnrControl: new FormControl<string>(''),
    telenrControl: new FormControl<string>(''),
    sprechzeitenControl: new FormControl<string>(''),
});

  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('arztnr') || '';
    console.log(this.id);
    this.readOne(this.id);
  }

  readOne(id: string): void {
      this.bs.getOne(id).subscribe(
      {
        next: (response: Doctor) => {
                this.doctor = response;
                console.log(this.doctor);
                this.form.patchValue({
                  fullnameControl: this.doctor?.fullname,
                  strasnrControl: this.doctor?.strasnr,
                  telenrControl: this.doctor?.telenr,
                  sprechzeitenControl: this.doctor?.sprechzeiten
                })
                return this.doctor;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getOne() completed')
      });
  }
  update(): void {
    const values = this.form.value;
    this.doctor.fullname = values.fullnameControl!;
    this.doctor.strasnr = values.strasnrControl!;
    this.doctor.telenr = values.telenrControl!;
    this.doctor.sprechzeiten = values.sprechzeitenControl!;
    this.bs.update(this.id, this.doctor)
      .subscribe({
        next: (response) => {
          console.log(response);
          console.log(response.arztnr);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => console.log('update() completed')
      }
      );
    this.router.navigateByUrl('/arzttable');
  }

  cancel(): void {
    this.location.back();
  }


}













