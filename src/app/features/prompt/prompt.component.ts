import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { PromptService } from '../service/prompt.service';
import { ToastService } from '../../shared/toast/toast.service';

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

  promptService = inject(PromptService);
  toastService = inject(ToastService);


  sendToast() {
    this.toastService.addToast({message: 'Hello World', type: 'success'})
  }



  buildDelimiterStart(sectionName: string){
    return this.promptService.settings().delimiter.start.replace('{sectionName}', sectionName)
  }
  buildDelimiterEnd(sectionName: string){
    return this.promptService.settings().delimiter.end.replace('{sectionName}', sectionName)
  }



  copyText(val: string){
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
