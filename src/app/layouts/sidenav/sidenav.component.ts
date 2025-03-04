import {Component, inject} from '@angular/core';
import {SidenavService} from './sidenav.service';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  sidenavService = inject(SidenavService)
  authService = inject(AuthService)

}
