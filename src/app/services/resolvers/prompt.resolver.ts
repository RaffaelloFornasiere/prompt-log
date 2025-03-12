import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable, mergeMap, of, map, switchMap, tap, iif} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {PromptsService} from '../prompts.service';
import {Prompt, PromptRecord} from '../../models/prompt.model';
import {HistoryService} from '../history.service';
import DiffMatchPatch, {Diff} from 'diff-match-patch';
import stableStringify from 'json-stable-stringify';
import * as jsondiffpatch from 'jsondiffpatch';


const promptResolve = (route: ActivatedRouteSnapshot): Observable<Prompt | undefined> | Observable<null> => {
  const authService = inject(AuthService);
  const promptService = inject(PromptsService);
  const historyService = inject(HistoryService);
  const prompt = route.params['promptInfo'];
  const promptId = prompt.split('@')[0];
  const promptVersion = prompt.split('@')[1];

  console.log(promptId, promptVersion);

  const buildOldPrompt = (prompt: Prompt) => {
    return historyService.getHistory(prompt.id)
      .pipe(map((history: PromptRecord[]) => {
        const patches = history
          .filter((record: PromptRecord) => promptVersion <= record.id)
          .map((record: PromptRecord) => JSON.parse(record.patchStr))
          .reverse();

        let obj = prompt as any;
        const diffPatcher = jsondiffpatch.create();
        patches.forEach((patch: jsondiffpatch.Delta) => obj = diffPatcher.unpatch(obj, patch));

        return obj as Prompt;
      }))
  }
  return authService.user$.pipe(
    switchMap(() => {
      return promptService.getPrompt(promptId)
    }),
    switchMap((prompt) =>
      iif(() => promptVersion,
        buildOldPrompt(prompt),
        of(prompt)
      )),
  )
};

export default promptResolve;
