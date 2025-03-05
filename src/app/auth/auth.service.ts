import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {BehaviorSubject, map, Observable, of, Subject, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';
import {Auth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User} from '@angular/fire/auth';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';
import {toSignal} from '@angular/core/rxjs-interop';


@Injectable({providedIn: 'root'})
export class AuthService {
  user$: BehaviorSubject<User | null | undefined> = new BehaviorSubject<User | null | undefined>(null)
  user = toSignal(this.user$)
  auth = inject(Auth)
  firestore = inject(Firestore)
  router = inject(Router)

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      if (user)
        this.user$.next(user as unknown as User)
    })
  }

  getAuthState() {
    return this.auth.authStateReady()
  }


  googleSignIn() {
    const provider = new GoogleAuthProvider()
    return fromPromise(signInWithPopup(this.auth, provider))
      .pipe(
        tap((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)

          // The signed-in user info.
          this.user$.next(result.user as unknown as User)
        }));
  }

  async signOut() {
    return fromPromise(signOut(this.auth)).pipe(tap(() => this.router.navigate(['/']).then()))
  }


}
