import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withViewTransitions } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient } from "@angular/common/http";
import { provideMarkdown } from "ngx-markdown";
import "prismjs";
import "prismjs/components/prism-typescript.min.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-highlight/prism-line-highlight.js";

import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "./environment";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { FIREBASE_OPTIONS } from '@angular/fire/compat';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    provideAnimations(),
    provideMarkdown(),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideFirebaseApp(
      () => initializeApp(environment.firebase),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
    ),
  ],
};
