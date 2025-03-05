import { ActivatedRouteSnapshot } from '@angular/router';
import {Observable, mergeMap, of, map, switchMap, tap} from 'rxjs';
import { inject } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {PromptsService} from '../../services/prompts.service';
import {Prompt} from '../../models/prompt.model';

const promptResolve = (route: ActivatedRouteSnapshot): Observable<any | undefined> | Observable<null> => {
  const authService = inject(AuthService);
  const promptService = inject(PromptsService);
  const promptId = route.params['promptId'];
  return authService.user$.pipe(
    switchMap((user: any) => {
      console.log('User', user);
      if (!user) return of(null);
      return promptService.getPrompt(promptId);
  }))
};

export default promptResolve;
