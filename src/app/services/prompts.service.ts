import {inject, Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Firestore,} from '@angular/fire/firestore';
import {combineLatest, concatMap, defer, map, mergeWith, of, switchMap, take} from 'rxjs';
import {NewPrompt, Prompt} from '../models/prompt.model';
import {StorageService} from '../core/storage/storage.service';
import DiffMatchPatch, {Diff} from 'diff-match-patch';
import {ToastService} from '../shared/toast/toast.service';
import stableStringify from 'json-stable-stringify';


@Injectable({providedIn: 'root'})
export class PromptsService {
  protected authService = inject(AuthService)
  protected firestore = inject(Firestore)
  protected storageService = inject(StorageService)
  protected toastService = inject(ToastService)

  getPrompts() {
    return this.storageService.getCollection('prompts')
  }


  computePatch(original: Prompt, updated: Prompt | NewPrompt) {
    const strOriginal = stableStringify(original);
    const strUpdated = stableStringify(updated);
    if (!strOriginal || !strUpdated) {
      this.toastService.addToast({message: 'Error updating prompt', type: 'error'})
      throw new Error('Error updating prompt')
    }

    const dmp = new DiffMatchPatch();
    const diffs = dmp.diff_main(strOriginal, strUpdated);
    dmp.diff_cleanupSemantic(diffs);
    const patch = dmp.patch_toText(dmp.patch_make(strOriginal, strUpdated, diffs))
    return {patchStr: patch}
  }


  newPrompt(prompt: NewPrompt) {
    const patch = this.computePatch({} as Prompt, prompt)
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
          return this.computePatch(oldPrompt, prompt)
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
