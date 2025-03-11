import {Component, input, model} from '@angular/core';
import {PromptRecord} from '../../models/prompt.model';
import {DatePipe} from '@angular/common';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';

@Component({
  selector: 'app-history',
  imports: [
    DatePipe,
    ShineEffectDirective
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  history = input<PromptRecord[]>();
  activeRecord = model<number>();


}
