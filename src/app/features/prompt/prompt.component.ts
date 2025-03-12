import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  ViewChild
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ToastService} from '../../shared/toast/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Example, Prompt, PromptRecord, Tool} from '../../models/prompt.model';
import {defaultBlockOrder, UserSettings} from '../../models/user-settings.model';
import {StorageService} from '../../core/storage/storage.service';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';
import stableStringify from 'json-stable-stringify';
import * as jsondiffpatch from 'jsondiffpatch';


@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [
    FormsModule,
    ShineEffectDirective,
  ],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.scss',
})
export class PromptComponent {
  @ViewChild('_prompt') _prompt !: ElementRef<HTMLDivElement>
  protected toastService = inject(ToastService);
  protected activatedRoute = inject(ActivatedRoute);
  protected storageService = inject(StorageService);
  protected router = inject(Router);

  private highlighted: boolean = false

  lines = computed(() => {
    return this.renderedPrompt().split('\n').map((line, index) => index+1).join('\n').trim()
  })
  renderedPrompt = computed(() => {
    const blocksOrder = this.settings()?.blocksOrder || defaultBlockOrder;

    return blocksOrder.reduce((acc, sectionName) => {
      acc += '\n' + this.buildDelimiterStart(sectionName) + '\n';
      if (this.prompt()?.[sectionName])
        acc += (this as any)[`stringify_${sectionName}`](this.prompt()?.[sectionName]);
      acc += '\n' + this.buildDelimiterEnd(sectionName) + '\n';
      return acc;
    }, '')

  })

  stringify_examples(examples: Example[]): string {
    return examples.reduce((acc, example) => {
      let result = `\n\n## ${example.title}\n\n`;
      result += `### ${example.description}\n\n`;
      result += `${example.content}\n\n`;
      return acc + result;
    }, '')

  }

  stringify_tools(tools: Tool[]): string {
    return tools.reduce((acc, tool) => {
      acc += '\n\n';
      acc += stableStringify(tool, {space: 2});
      return acc
    }, '')
  }

  stringify_taskDescription(taskDescription:string): string {
    return taskDescription;
  }

  prompt = signal<Prompt | undefined>(undefined);
  settings = signal<UserSettings | undefined>(undefined);

  constructor() {
    this.activatedRoute.data.subscribe(({prompt}) => {
      this.prompt.set(prompt);
    });
    this.storageService.getDocument().subscribe((userSettings) => {
      this.settings.set(userSettings.settings);
    });
  }

  buildDelimiterStart(sectionName: string) {
    return this.settings()?.delimiter.start.replace('{sectionName}', sectionName) || '';
  }

  buildDelimiterEnd(sectionName: string) {
    return this.settings()?.delimiter.end.replace('{sectionName}', sectionName) || '';
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
