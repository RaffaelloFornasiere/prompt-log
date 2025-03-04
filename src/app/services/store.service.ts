import {computed, inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc} from '@angular/fire/firestore';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';
import {AuthService} from '../auth/auth.service';

interface Prompt {
  id: string,
  name: string,
}

@Injectable({providedIn: 'root'})
export class StoreService {
  firestore = inject(Firestore)
  authService = inject(AuthService)

  prompts = computed(() =>
    collection(this.firestore, `users/${this.authService.user()?.uid}/prompts`));


  getPrompts() {
    return collectionData(this.prompts(), {idField: 'id'})
  }

  addPrompt(prompt: any) {
    return fromPromise(addDoc(this.prompts(), prompt))
  }

  removePrompt(prompt: Prompt) {
    const docRef = doc(this.prompts(), 'prompts/' + prompt.id)
    return fromPromise(deleteDoc(docRef))
  }

  updatePrompt(prompt: Prompt) {
    const docRef = doc(this.prompts(), 'prompts/' + prompt.id)
    return fromPromise(setDoc(docRef, prompt))
  }


}
