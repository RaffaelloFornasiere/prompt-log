import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-prompt-settings',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './prompt-settings.component.html',
  styleUrl: './prompt-settings.component.scss'
})
export class PromptSettingsComponent {
  delimiter = 'json';

  variables:string[] = []
  impersonate :string|null= ''

}
