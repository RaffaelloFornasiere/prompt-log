import {computed, effect, inject, Injectable, OnInit, signal} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore, setDoc,
} from '@angular/fire/firestore';
import {map, of, switchMap} from 'rxjs';
import {NewPrompt, Prompt} from '../models/prompt.model';
import {DocumentData} from '@angular/fire/compat/firestore';
import {StorageService} from '../core/storage/storage.service';
import DiffMatchPatch from 'diff-match-patch';
import {ToastService} from '../shared/toast/toast.service';

@Injectable({providedIn: 'root'})
export class PromptsService {
  protected authService = inject(AuthService)
  protected firestore = inject(Firestore)
  protected storageService = inject(StorageService)
  protected toastService = inject(ToastService)

  getPrompts() {
    return this.storageService.getCollection('prompts')
  }


  newPrompt(prompt: NewPrompt) {
    const dmp = new DiffMatchPatch();
    const diff = Object.assign({}, dmp.diff_main('', JSON.stringify(prompt)));
    this.storageService.addDocument(prompt, 'prompts')
      .pipe(switchMap((prompt) => {
        return this.storageService.setDocument(diff, Date.now().toString(), 'prompts', prompt.id, 'history')
      })).subscribe()
  }

  updatePrompt(prompt: Prompt) {
    const dmp = new DiffMatchPatch();
    const diff = Object.assign({}, dmp.diff_main('', JSON.stringify(prompt)));
    this.storageService.updateDocument(prompt, 'prompts', prompt.id)
      .pipe(switchMap(() => {
        console.log('update prompt history', prompt)
        return this.storageService.setDocument(diff, Date.now().toString(), 'prompts', prompt.id, 'history')
      })).subscribe()
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
