import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {MainComponent} from './app/layouts/main/main.component';

bootstrapApplication(MainComponent, appConfig)
  .catch((err) => console.error(err));
