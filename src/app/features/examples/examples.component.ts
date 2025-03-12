import {Component, inject, OnDestroy, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { TextAreaComponent } from '../../shared/text-area/text-area.component';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';
import {ActivatedRoute} from '@angular/router';
import {Example, Prompt} from '../../models/prompt.model';
import {StorageService} from '../../core/storage/storage.service';
import {PromptsService} from '../../services/prompts.service';



@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [
    FormsModule,
    InputComponent,
    TextAreaComponent,
    ShineEffectDirective,
  ],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss',
})
export class ExamplesComponent implements OnDestroy{

  activatedRoute = inject(ActivatedRoute);
  examples = signal<Example[]>([]);
  promptsService = inject(PromptsService);
  prompt: Prompt | undefined = undefined;

  constructor() {
    this.activatedRoute.data.subscribe(({prompt}) => {
      this.examples.set(prompt.examples ?? []);
      this.prompt = prompt;
    });
  }

  ngOnDestroy() {
  }

  save(){
    this.prompt!.examples = this.examples();
    this.promptsService.updatePrompt(this.prompt!).subscribe()

  }

  addExample(){
    this.examples.update((examples) => {
      examples.push({
        title: '',
        description: '',
        content: ''
      })
      return examples
    })
  }

  deleteExample(index: number){
    this.examples.update((examples) => {
      examples.splice(index, 1);
      return examples;
    })
  }

}
