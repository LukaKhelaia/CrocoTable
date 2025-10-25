import { Component, OnInit } from '@angular/core';
import { todo } from '../Services/todolist.model';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../Services/get-data-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todolist',
  imports: [CommonModule],
  templateUrl: './todolist.html',
  styleUrl: './todolist.css'
})
export class Todolist implements OnInit{
 
  todos: todo[] = [];
  filteredTodos: todo[] = [];
  userId!: number;

  constructor(private route: ActivatedRoute, private api: GetDataService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId'];
      this.loadTodos();
    })
  }

  //Get and filter the todo list
  loadTodos(): void {
    this.api.getToDoList().subscribe((data: todo[]) => {
      this.filteredTodos = data.filter(todo => todo.userId === this.userId);
    })
  }
}
