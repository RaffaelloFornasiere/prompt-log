import {computed, effect, inject, Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable, of, switchMap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PromptsService {
  authService = inject(AuthService)
  firestore = inject(Firestore)
  prompts$!: Observable<any[]>
  user = this.authService.user
  promptsCollections =
    computed(() => collection(this.firestore, 'users', this.user()!.uid, 'prompts'))

  constructor() {
    const promptChanges = () => {
      const user = this.user()
      return user ? collectionData(this.promptsCollections(), { idField: 'id' }) : of([])
    }
    this.prompts$ = this.authService.user$.pipe(
      switchMap(() => promptChanges()),
    )

  }


  newPrompt(prompt: any) {
    if (!this.user()) return
    addDoc(this.promptsCollections(), prompt).then(() => console.log('Prompt added'))
  }

  deletePrompt(prompt: any) {
    if (!this.user()) return
    console.log('Deleting prompt', prompt)
    const promptRef = doc(this.firestore, 'users', this.user()!.uid, 'prompts', prompt.id)
    deleteDoc(promptRef).then(() => console.log('Prompt deleted'))
  }

  getPrompt(promptId: string) {
    return docData(doc(this.firestore, 'users', this.user()!.uid, 'prompts', promptId), {idField: 'id'})
  }
}
