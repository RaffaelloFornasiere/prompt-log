import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PromptService} from '../service/prompt.service';
import {ToastService} from '../../shared/toast/toast.service';
import {ActivatedRoute} from '@angular/router';
import {PromptsService} from '../../services/prompts.service';
import {Prompt} from '../../models/prompt.model';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.scss',
})
export class PromptComponent {

  toastService = inject(ToastService);
  settingsService = inject(SettingsService);
  activatedRoute = inject(ActivatedRoute);
  prompt: Prompt | undefined = undefined;


  constructor() {
    console.log('PromptComponent');
    this.activatedRoute.data.subscribe(({prompt}) => {
      this.prompt = prompt;
      console.log('Prompt', prompt);
    });
  }

  buildDelimiterStart(sectionName: string) {
    return (this.settingsService.settings()?.delimiter as any).start.replace('{sectionName}', sectionName);
  }

  buildDelimiterEnd(sectionName: string) {
    return sectionName
  }


  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  protected readonly JSON = JSON;
}
