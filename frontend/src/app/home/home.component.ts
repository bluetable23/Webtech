import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {




constructor(
  private route: ActivatedRoute,
  private bs: BackendService,
  private location: Location,
  private router: Router
) { }

weiter(): void {
  
  this.router.navigateByUrl('/arzttable');
  

}


}
