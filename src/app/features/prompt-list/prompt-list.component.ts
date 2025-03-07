import {Component, inject, OnInit, Signal, signal} from '@angular/core';
import {InputComponent} from '../../shared/input/input.component';
import {SelectComponent} from '../../shared/select/select.component';
import {Prompt} from '../../models/prompt.model';
import {PromptsService} from '../../services/prompts.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {collection} from '@angular/fire/firestore';

@Component({
  selector: 'app-prompt-list',
  imports: [
    ShineEffectDirective,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './prompt-list.component.html',
  styleUrl: './prompt-list.component.scss'
})
export class PromptListComponent implements OnInit{
  protected promptsService = inject(PromptsService)
  protected prompts$!: Observable<Prompt[]>

  ngOnInit() {
    this.prompts$ = this.promptsService.getPrompts()
    this.prompts$.subscribe(console.log)
  }

  newPrompt(){
    const prompt = {title: 'New Prompt', description: 'Description'}
    this.promptsService.newPrompt(prompt)
  }
}
