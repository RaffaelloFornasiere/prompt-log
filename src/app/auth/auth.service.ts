import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {BehaviorSubject, map, Observable, of, Subject, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';
import {
  Auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from '@angular/fire/auth';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';
import {toSignal} from '@angular/core/rxjs-interop';
import {LocalStorageService} from '../core/storage/local-storage.service';
import {ToastService} from '../shared/toast/toast.service';


@Injectable({providedIn: 'root'})
export class AuthService {
  protected auth = inject(Auth)
  protected firestore = inject(Firestore)
  protected router = inject(Router)
  protected toastService = inject(ToastService)

  user$: BehaviorSubject<User | null | undefined> = new BehaviorSubject<User | null | undefined>(null)
  user = toSignal(this.user$)

  constructor() {
    this.user$.next(this.auth.currentUser)
    this.auth.onAuthStateChanged((user) => {
      if (user)
        this.user$.next(user as unknown as User)
    })
  }

  identity(user: UserCredential | null): void {
    if (!user) return
    this.user$.next(user.user as unknown as User)
    this.toastService.addToast({message: 'Logged in successfully', type: 'success'})
    this.router.navigate(['/']).then()
  }

  passwordSignIn(email: string, password: string) {
    return fromPromise(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        tap((result) => {
          this.identity(result)
        }));
  }

  passwordSignUp(email: string, password: string) {
    return fromPromise(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        tap((result) => {
            this.identity(result)
          }
        )
      )
  }


  googleSignIn() {
    const provider = new GoogleAuthProvider()
    return fromPromise(signInWithPopup(this.auth, provider))
      .pipe(
        tap((result) => {
          this.identity(result)
        })).subscribe()
  }

  signOut() {
    return fromPromise(signOut(this.auth))
      .pipe(tap(() => this.user$.next(null)))
  }


}
