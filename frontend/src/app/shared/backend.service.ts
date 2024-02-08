import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl = 'http://localhost:3000/api/doctors/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.baseUrl);
  }
  
  registerDoctor(doctor:Doctor): Observable<any> {
    return this.http.post(this.baseUrl ,  doctor);
  }

  getOne(id: string): Observable<Doctor>{
    return this.http.get<Doctor>(this.baseUrl + id);
  }

  update(id: string, data: Doctor): Observable<Doctor> {
    return this.http.patch<Doctor>(this.baseUrl +  id, data);
  }

  deleteOne(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrl + id, {observe: 'response'});
  }  
}


