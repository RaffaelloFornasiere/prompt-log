import {Component, effect, inject, input, model, signal} from '@angular/core';
import {PromptRecord} from '../../models/prompt.model';
import {DatePipe} from '@angular/common';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';
import {filter} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HistoryService} from '../../services/history.service';
import prompt from '../task-description/improve-prompt.prompt';

@Component({
  selector: 'app-history',
  imports: [
    DatePipe,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  history = signal<PromptRecord[]>([]);
  activeRecord = signal<string>('');
  promptId = signal('');

  protected historyService = inject(HistoryService);
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const isPromptSectionEnabled = this.router.url.includes('prompt/');
        if (isPromptSectionEnabled)
          this.getPromptId();
      });
    this.getPromptId();

    effect(() => {
      if(this.promptId() === '') return;
      this.historyService.getHistory(this.promptId()).subscribe((history) => {
        this.history.set(history);
      })
    })
  }

  selectRecord(record: PromptRecord) {
    this.activeRecord.set(record.id);

    const promptInfo = this.activatedRoute.snapshot.paramMap.get('promptInfo');
    if (!promptInfo) return;
    const preUrl = this.router.url.split(promptInfo)[0];
    const postUrl = this.router.url.split(promptInfo)[1];

    const promptId = promptInfo.split('@')[0];

    console.log(preUrl, postUrl, promptId, record.id);

    let url = `${preUrl}${promptId}`;
    if (record.id !== this.history()[0].id)
      url += `@${record.id}`;
    url += postUrl;

    this.router.navigateByUrl(url).then()
  }

  getPromptId() {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    route.params.subscribe(params => {
      const promptDetails = params['promptInfo'] || '';
      this.promptId.set(promptDetails.split('@')[0]);
      this.activeRecord.set(promptDetails.split('@')[1]);

    });
  }

}
