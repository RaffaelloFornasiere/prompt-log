import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {provideHttpClient} from '@angular/common/http';
import {getAuth, provideAuth} from '@angular/fire/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC-N5Jhad8V_8e4t-yXK0Q111xN3ebGSD4",
  authDomain: "promptgenerator-33fca.firebaseapp.com",
  projectId: "promptgenerator-33fca",
  storageBucket: "promptgenerator-33fca.firebasestorage.app",
  messagingSenderId: "688744862995",
  appId: "1:688744862995:web:1980e856eddbeb145276e6",
  measurementId: "G-9H1V0T1ZKY"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

  ]
};
