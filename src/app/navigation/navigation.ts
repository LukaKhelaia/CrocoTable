import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navigation',
  imports: [RouterLink,RouterLinkActive,CommonModule,FormsModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation {
  
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
