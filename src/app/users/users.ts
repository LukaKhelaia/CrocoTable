import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../Services/get-data-service';
import { CommonModule } from '@angular/common';
import { User } from '../Services/user.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { query } from '@angular/animations';


@Component({
  selector: 'app-users',
  imports: [CommonModule,FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit{

  users: User[] = [];
  searchTerm: string = '';

  constructor(private api: GetDataService, private router: Router) {}

  //Use service to get users data
  ngOnInit(): void {
    this.api.getUsers().subscribe(data => {
      this.users = data;
    })
  }

  //Filter users based on search
  filteredUsers(): User[] {
    const term = this.searchTerm.toLocaleLowerCase();
    return this.users.filter(user =>
      user.name.toLocaleLowerCase().includes(term) ||
      user.email.toLocaleLowerCase().includes(term)
    )
  }

  //View user posts
  viewPosts(userId: number): void {
    this.router.navigate(['/posts'], {queryParams: {userId}})
  }

  //View user to do list
  viewList(userId: number): void {
    this.router.navigate(['/todolist'], {queryParams: {userId}})
  }

}
