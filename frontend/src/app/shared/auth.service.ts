import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000/api';
  user: User = {usernamea: '', passworda: '', emaila: '', rolea: ''};
  userChange: Subject<User> = new Subject<User>();
  loggedIn = false;
  loggedInChange: Subject<boolean> = new Subject<boolean>();


  constructor(private http: HttpClient) {
    this.loggedInChange.subscribe((value) => {
            this.loggedIn = value
    });
    this.userChange.subscribe((value) => {
            this.user = value
    });
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + '/users');
  }

  registerUser(user:User): Observable<any> {
    return this.http.post(this.baseUrl + '/users/register', user);
  }

  getOneUser(usernamea: string): Observable<User>{
    return this.http.get<User>(this.baseUrl + '/users/' + usernamea);
  }

  isLoggedin(): boolean {
    return this.loggedIn;
  }

  loginUser(usernamea: string, passworda: string ): Observable<any>{
    return this.http.post(this.baseUrl + '/users/login/', { usernamea: usernamea, passworda: passworda }, {observe: 'response'});
  }

  login(user: User): void {
    this.loggedIn = true
    this.loggedInChange.next(this.loggedIn);
    this.user = user;
    this.userChange.next(this.user);
    console.log('login() : ', this.user);
  }

  logout(): void {
    this.loggedIn = false;
    this.loggedInChange.next(this.loggedIn);
    this.user = {usernamea: '', passworda: '', emaila: '', rolea: ''};
    this.userChange.next(this.user);
  }

  getUser(): User | null {
    return this.user;
  }

  isAdmin(): boolean {
    if(this.user?.rolea === 'admin')
    {
      return true;
    }
    return false;
  }

  isUser(): boolean {
    if(this.user?.rolea === 'user')
    {
      return true;
    }
    return false;
  }


  deleteUser(usernamea: string): Observable<any>{
    return this.http.delete<any>(this.baseUrl + "/users/"+usernamea, {observe: 'response'});
  }  
}