import {Component, inject} from '@angular/core';
import {SidenavService} from './sidenav.service';
import {RouterLink} from '@angular/router';
import { AuthService } from '../../core/auth.service';

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


  protected authService = inject(AuthService);

  login() {
    this.authService.googleSignIn().catch((error) => {
      console.error("Login error:", error);
    });
  }
}
