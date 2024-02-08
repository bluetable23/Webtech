import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private router: Router,private auth: AuthService) {}


  callLogout() {
    
    this.auth.logout();
    this.router.navigate(['/login'])
  }

  }


