import {Component, computed, inject} from '@angular/core';
import {SidenavService} from './sidenav.service';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {SettingsService} from '../../services/settings.service';
import {PromptsService} from '../../services/prompts.service';
import {NgOptimizedImage} from '@angular/common';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';
import {filter} from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink,
    ShineEffectDirective,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  sidenavService = inject(SidenavService)
  authService = inject(AuthService)

  router = inject(Router)

  isPromptSectionEnabled = false;
  promptId = ""
  activatedRoute = inject(ActivatedRoute)

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isPromptSectionEnabled = this.router.url.includes('prompt/');
        if (this.isPromptSectionEnabled)
          this.getPromptId();
      });
    this.isPromptSectionEnabled = this.router.url.includes('prompt/');
    this.getPromptId();
  }

  getPromptId() {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    route.params.subscribe(params => {
      this.promptId = params['promptId'] || null;
    });
  }

  signOut() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/login']).then();
    });
  }
}
