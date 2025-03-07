import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ToastService} from '../../shared/toast/toast.service';
import {ActivatedRoute} from '@angular/router';
import {Prompt} from '../../models/prompt.model';

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
  activatedRoute = inject(ActivatedRoute);
  prompt: Prompt | undefined = undefined;


  constructor() {
    this.activatedRoute.data.subscribe(({prompt}) => {
      this.prompt = prompt;
    });
  }

  buildDelimiterStart(sectionName: string) {
    return sectionName
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
