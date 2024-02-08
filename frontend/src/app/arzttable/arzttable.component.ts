import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Doctor } from '../shared/doctor';

@Component({
  selector: 'app-arzttable',
  templateUrl: './arzttable.component.html',
  styleUrls: ['./arzttable.component.css']
})
export class ArzttableComponent implements OnInit {

  doctors: Doctor[] = [];
  deleted = false;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['pic','arztnr', 'fullname', 'strasnr','telenr','sprechzeiten','bearbeiten'];

  constructor(private bs: BackendService,private router: Router) {

  }
  

ngOnInit(): void {
  this.readAll();
}

readAll(): void {
  this.bs.getAll().subscribe(
        {
          next: (response) => {
                this.doctors = response;
                console.log(this.doctors);
                return this.doctors;
              },
          error: (err) => console.log(err),
          complete: () => console.log('getAll() completed')
        })
}

delete(id: string): void {
  this.bs.deleteOne(id).subscribe(
    {
      next: (response: any) => {
        console.log('response : ', response);
        if(response.status == 204){
                console.log(response.status);
                this.reload(true);
              } else {
                console.log(response.status);
                console.log(response.error);
                this.reload(false);
              }
      },
      error: (err) => console.log(err),
      complete: () => console.log('deleteOne() completed')
  });
}


reload(deleted: boolean)
  {

    this.deleted = deleted;
    this.readAll();
    this.router.navigateByUrl('/home');
  }

  doctorImages = [
    'assets/bilder/arztn.png',
    'assets/bilder/doctor-consultan-medical-worker-icon-free-vector.jpg',
    'assets/bilder/zighug.jpg',
    'assets/bilder/doctorrrr.jpg',
    'assets/bilder/blaaaaaaa (1).jpg',
    'assets/bilder/esgeseges.jpg',
    'assets/bilder/gzzugtzifiz.jpg',
    'assets/bilder/blaaa.jpg',
    'assets/bilder/hlhkjbjl.png'
   
    // Weitere Bild-URLs hinzufügen
  ];
  
  currentImageIndex = 0;
  
  getDoctorImage(doctor: any): string {
    const image = this.doctorImages[this.currentImageIndex];
    this.currentImageIndex = (this.currentImageIndex + 1) % this.doctorImages.length; // Erhöhe den Index und setze ihn zurück, wenn das Ende der Liste erreicht ist
    return image;
  }



}