import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidenavComponent} from './layouts/sidenav/sidenav.component';
import {MainComponent} from './layouts/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prompt-generator';
}
