import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Google Sign-In
  async googleSignIn(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await this.afAuth.signInWithPopup(provider);
  }

  // Sign Out
  async signOut(): Promise<void> {
    await this.afAuth.signOut();
  }

  // Get current user
  get currentUser$() {
    return this.afAuth.authState;
  }

  // Get auth token (for backend calls)
  async getToken(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user?.getIdToken() || null;
  }
}