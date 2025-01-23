import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {SidenavComponent} from "../sidenav/sidenav.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    SidenavComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {

  route = inject(ActivatedRoute);

}
