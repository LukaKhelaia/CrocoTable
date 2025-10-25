import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  
  //Url from where the data is coming
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  //For getting the users Information
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  } 

  //For getting the users Posts
  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`);
  }

  //For getting todolist
  getToDoList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todos`);
  }

}
