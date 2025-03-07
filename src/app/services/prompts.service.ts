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
import {map, of} from 'rxjs';
import {Prompt} from '../models/prompt.model';
import {DocumentData} from '@angular/fire/compat/firestore';

@Injectable({providedIn: 'root'})
export class PromptsService {
  authService = inject(AuthService)

  public firestore = inject(Firestore)

  getPrompts() {
    const user = this.authService.user()
    if (!user) return of([])
    const promptsCollections = collection(this.firestore, 'users', user.uid, 'prompts')
    return collectionData(promptsCollections, {idField: 'id'})
      .pipe(map((prompts: DocumentData[]) => prompts.map(prompt => ({...prompt as Prompt}))))
  }

  newPrompt(prompt: any) {
    const user = this.authService.user()
    if (!user) return
    const promptsCollections = collection(this.firestore, 'users', user.uid, 'prompts')
    addDoc(promptsCollections, prompt).then((promptResponse) => {
      const docId = promptResponse.id
      const historyCollection = doc(this.firestore, 'users', user.uid, 'prompts', docId, 'history', new Date().toISOString())
      setDoc(historyCollection, {title: prompt.title, description: prompt.description}).then(() => console.log('Prompt added'))
    })
  }

  deletePrompt(prompt: any) {
    const user = this.authService.user()
    if (!user) return
    const promptRef = doc(this.firestore, 'users', user.uid, 'prompts', prompt.id)
    deleteDoc(promptRef).then(() => console.log('Prompt deleted'))
  }

  getPrompt(promptId: string) {
    const user = this.authService.user()
    if (!user) return of(null)
    return docData(doc(this.firestore, 'users', user.uid, 'prompts', promptId), {idField: 'id'})
  }
}
