import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.currentUser$.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/login']).then();
          return false;
        }
        return true;
      })
    );
  }
}