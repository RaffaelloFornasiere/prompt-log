import {Component, ElementRef, inject, signal, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ToastService} from '../../shared/toast/toast.service';
import {ActivatedRoute} from '@angular/router';
import {Prompt} from '../../models/prompt.model';
import {UserSettings} from '../../models/user-settings.model';
import {StorageService} from '../../core/storage/storage.service';
import {ExpansionComponent} from '../../shared/expansion/expansion.component';

@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [
    FormsModule,
    ExpansionComponent
  ],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.scss',
})
export class PromptComponent {
  @ViewChild('_prompt') _prompt !: ElementRef<HTMLDivElement>
  toastService = inject(ToastService);
  activatedRoute = inject(ActivatedRoute);
  storageService = inject(StorageService);
  prompt: Prompt | undefined = undefined;
  settings: UserSettings | undefined = undefined;


  constructor() {
    this.activatedRoute.data.subscribe(({prompt}) => {
      this.prompt = prompt;
    });
    this.storageService.getDocument().subscribe((userSettings) => {
      this.settings = userSettings.settings;
    });

  }

  buildDelimiterStart(sectionName: string) {
    return this.settings?.delimiter.start.replace('{sectionName}', sectionName) || '';
  }

  buildDelimiterEnd(sectionName: string) {
    return this.settings?.delimiter.end.replace('{sectionName}', sectionName) || '';
  }


  copyText() {
    const clone = this._prompt.nativeElement.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('[data-no-copy="true"]').forEach((el) => el.remove());
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = clone.innerText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  protected readonly JSON = JSON;
}
