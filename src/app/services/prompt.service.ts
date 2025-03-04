import {computed, effect, inject, Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {addDoc, collection, collectionData, doc, Firestore, getDocs, setDoc} from '@angular/fire/firestore';
import {mergeWith, Observable, of, Subject, switchAll, switchMap} from 'rxjs';
import {Prompt} from '../models/prompt.model';

@Injectable({providedIn: 'root'})
export class PromptService {
  authService = inject(AuthService)
  firestore = inject(Firestore)
  prompts$!: Observable<any[]>
  user = this.authService.user
  promptsCollections =
    computed(() => collection(this.firestore, 'users', this.user()!.uid, 'prompts'))

  constructor() {
    const promptChanges = () => {
      const user = this.user()
      return user? collectionData(this.promptsCollections()): of([])
    }
    this.prompts$ = this.authService.user$.pipe(
      switchMap(() => promptChanges()),
    )
  }

  newPrompt() {
    if(!this.user()) return
    const prompt: Prompt = {
      title: 'Untitled',
      description: '',
      variables: [],
      examples: [],
      tools: [],
      outputFormat: null,
    }
    addDoc(this.promptsCollections(), prompt).then()
  }
}
