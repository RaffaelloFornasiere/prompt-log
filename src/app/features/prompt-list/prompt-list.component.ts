import {Component, inject, OnDestroy, OnInit, Signal, signal} from '@angular/core';
import {NewPrompt, Prompt} from '../../models/prompt.model';
import {PromptsService} from '../../services/prompts.service';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';
import {ActivatedRoute, Router} from '@angular/router';
import {AsyncPipe} from '@angular/common';

type ModifiablePrompt = Prompt & { modified?: boolean }


@Component({
  selector: 'app-prompt-list',
  imports: [
    ShineEffectDirective,
  ],
  templateUrl: './prompt-list.component.html',
  styleUrl: './prompt-list.component.scss'
})
export class PromptListComponent implements OnDestroy {
  protected promptsService = inject(PromptsService)
  protected prompts: ModifiablePrompt[] = []
  protected router = inject(Router)
  editing:string | null = null

  ngOnDestroy() {
    this.prompts
      .filter(prompt => prompt.modified)
      .forEach(prompt => {
        delete prompt.modified
        this.promptsService.updatePrompt(prompt).subscribe()
      })
  }

  savePrompt(prompt: ModifiablePrompt) {
    delete prompt.modified
    this.promptsService.updatePrompt(prompt).subscribe()
  }

  constructor() {
    this.promptsService.getPrompts().subscribe(prompts => {
      this.prompts = prompts.map(prompt => ({...prompt, modified: false}))
    })
  }

  deletePrompt(prompt: Prompt) {
    this.promptsService.deletePrompt(prompt.id)
  }

  newPrompt() {
    const prompt = {title: 'New Prompt', description: 'Description'} as Prompt
    this.promptsService.newPrompt(prompt)
      .subscribe(newPrompt => {
      })
  }

  editTitle(prompt: ModifiablePrompt, event: Event) {
    const target = event.target as HTMLSpanElement
    if (target.innerText === prompt.title) return
    prompt.title = target.innerText
    prompt.modified = true
  }


  editDescription(prompt: ModifiablePrompt, event: Event) {
    const target = event.target as HTMLSpanElement
    if (target.innerText === prompt.description) return

    prompt.description = target.innerText
    prompt.modified = true
  }
}
