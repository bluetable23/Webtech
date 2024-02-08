import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users: User[] = [];
  deleted = false;

  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['username', 'email', 'role', 'bearbeiten'];

  constructor(private auth: AuthService,private router: Router) {

  }
  ngOnInit(): void {
    this.auth.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        console.log('this.users', this.users)
      }
    })
  }

  readAll(): void {
    this.auth.getAllUsers().subscribe(
          {
            next: (response) => {
                  this.users = response;
                  console.log(this.users);
                  return this.users;
                },
            error: (err) => console.log(err),
            complete: () => console.log('getAll() completed')
          })
  }

  delete(usernamea: string): void {
    this.auth.deleteUser(usernamea).subscribe(
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
      this.router.navigateByUrl('/userlist');
    }
  
  }