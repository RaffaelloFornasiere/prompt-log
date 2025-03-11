import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable, mergeMap, of, map, switchMap, tap, iif} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {PromptsService} from '../prompts.service';
import {Prompt, PromptRecord} from '../../models/prompt.model';
import {HistoryService} from '../history.service';
import DiffMatchPatch, {Diff} from 'diff-match-patch';
import stableStringify from 'json-stable-stringify';


function invertPatch(patch: any): any {
  return {
    diffs: patch.diffs.map(([op, text]: [number, string]) => {
      if (op === 1) return [-1, text];
      if (op === -1) return [1, text];
      return [0, text];
    }),
    start1: patch.start2,
    start2: patch.start1,
    length1: patch.length2,
    length2: patch.length1
  };
}

const promptResolve = (route: ActivatedRouteSnapshot): Observable<Prompt | undefined> | Observable<null> => {
  const authService = inject(AuthService);
  const promptService = inject(PromptsService);
  const historyService = inject(HistoryService);
  const prompt = route.params['promptId'];
  const promptId = prompt.split('@')[0];
  const promptVersion = prompt.split('@')[1];

  const f = (prompt: Prompt) => {
    return historyService.getHistory(prompt.id)
      .pipe(map((history: PromptRecord[]) => {
        const dmp = new DiffMatchPatch();
        let currentVersion = stableStringify(prompt)!;
        const patches = history
          .filter((record: PromptRecord) => promptVersion <= record.id)
          .map((record: PromptRecord) =>
            dmp.patch_fromText(record.patchStr))
          .reduce((acc: any[], patch) => {
            return [...acc, ...patch];
          }, []).reverse();

        for (const patch of patches) {
          const [newVersion, results] = dmp.patch_apply([patch], currentVersion);
          currentVersion = newVersion;
        }
        return JSON.parse(currentVersion) as Prompt;
      }))
  }
  return authService.user$.pipe(
    switchMap(() => {
      return promptService.getPrompt(promptId)
    }),
    switchMap((prompt) =>
      iif(() => promptVersion,
        f(prompt),
        of(prompt)
      )),
  )
};

export default promptResolve;
