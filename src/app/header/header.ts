import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{

  currentTime: string = '';

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // For updating in every 1 second
  }

  //Function to get current time
  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleString();
  }

}
