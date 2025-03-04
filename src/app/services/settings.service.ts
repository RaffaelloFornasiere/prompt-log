import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {collection, collectionData, doc, docData, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import {UserSettings} from '../models/user-settings.model';
import {User} from '@angular/fire/auth';
import {map} from 'rxjs';


@Injectable({providedIn: 'root'})
export class SettingsService {
  firestore = inject(Firestore)
  authService = inject(AuthService)

  settings = signal<UserSettings | null>(null)

  constructor() {
    effect(() => {
      const user = this.authService.user()
      if (!user) {
        this.settings.set(null)
        return
      }
      docData(doc(this.firestore, 'users', user!.uid))
        .pipe(map((data: any) => data.settings as unknown as UserSettings))
        .subscribe((settings) => this.settings.set(settings))
    });
  }

  updateSettings(settings: UserSettings) {
    setDoc(doc(this.firestore, 'users', this.authService.user()!.uid), {settings}).then()
  }

}
