import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Navigation } from "./navigation/navigation";
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navigation, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('croco');
}
