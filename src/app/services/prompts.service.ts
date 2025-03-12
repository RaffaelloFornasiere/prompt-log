import {inject, Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Firestore,} from '@angular/fire/firestore';
import {combineLatest, concatMap, defer, map, mergeWith, of, switchMap, take} from 'rxjs';
import {NewPrompt, Prompt} from '../models/prompt.model';
import {StorageService} from '../core/storage/storage.service';
import {ToastService} from '../shared/toast/toast.service';
import stableStringify from 'json-stable-stringify';
import * as jsondiffpatch from 'jsondiffpatch';

@Injectable({providedIn: 'root'})
export class PromptsService {
  protected authService = inject(AuthService)
  protected firestore = inject(Firestore)
  protected storageService = inject(StorageService)
  protected toastService = inject(ToastService)

  getPrompts() {
    return this.storageService.getCollection('prompts')
  }


  computePatchStr(original: Prompt, updated: Prompt | NewPrompt) {
    const diffPatcher = jsondiffpatch.create();
    const delta = diffPatcher.diff(original, updated);
    return {patchStr: stableStringify(delta)}
  }


  newPrompt(prompt: NewPrompt) {
    const patch = this.computePatchStr({} as Prompt, prompt)
    return this.storageService.addDocument(prompt, 'prompts')
      .pipe(switchMap((prompt) => {
        return this.storageService.setDocument(patch, Date.now().toString(), 'prompts', prompt.id, 'history')
      }))
  }

  updatePrompt(prompt: Prompt) {
    const getDiffs$ = () =>
      this.storageService.getDocument('prompts', prompt.id)
        .pipe(
          take(1),
          map((oldPrompt) => {
          return this.computePatchStr(oldPrompt, prompt)
        }))


    return getDiffs$().pipe(
      switchMap((patch) => {
        return this.storageService.updateDocument(prompt, 'prompts', prompt.id).pipe(map(() => patch))
      }),
      switchMap((patch) => {
        return this.storageService.setDocument(patch, Date.now().toString(), 'prompts', prompt.id, 'history')
      })
    )
  }

  deletePrompt(promptId: string) {
    this.storageService.deleteDocument('prompts', promptId)
      .subscribe(() => {
        this.toastService.addToast({message: 'Prompt deleted', type: 'success'})
      })
  }

  getPrompt(promptId: string) {
    return this.storageService.getDocument('prompts', promptId)
  }


}
