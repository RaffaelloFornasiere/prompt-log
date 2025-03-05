import {Component, inject, OnInit, Signal, signal} from '@angular/core';
import {InputComponent} from '../../shared/input/input.component';
import {SelectComponent} from '../../shared/select/select.component';
import {Prompt} from '../../models/prompt.model';
import {PromptsService} from '../../services/prompts.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-prompt-list',
  imports: [
    ShineEffectDirective,
    RouterLink
  ],
  templateUrl: './prompt-list.component.html',
  styleUrl: './prompt-list.component.scss'
})
export class PromptListComponent{
  protected promptsService = inject(PromptsService)
  prompts = toSignal<Prompt[] | undefined>(this.promptsService.prompts$)


}
