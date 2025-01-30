import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: AngularFirestore) {}

  // Get user document
  getUserDoc(uid: string) {
    return this.firestore.doc(`users/${uid}`);
  }

  // Save settings
  saveSettings(uid: string, settings: any) {
    return this.getUserDoc(uid).set({ settings }, { merge: true });
  }

  // Get prompts
  getPrompts(uid: string) {
    return this.getUserDoc(uid).collection('prompts').valueChanges({ idField: 'id' });
  }

  // Save prompt
  savePrompt(uid: string, prompt: any) {
    return this.getUserDoc(uid).collection('prompts').add(prompt);
  }
}