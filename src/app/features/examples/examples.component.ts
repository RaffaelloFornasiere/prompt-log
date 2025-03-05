import { Component, inject, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { PromptService } from '../service/prompt.service';
import { InputComponent } from '../../shared/input/input.component';
import { TextAreaComponent } from '../../shared/text-area/text-area.component';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';



export type Example = {
  name: string,
  description: string,
  content: string
}

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [
    FormsModule,
    InputComponent,
    TextAreaComponent,
    ShineEffectDirective
  ],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss',
})
export class ExamplesComponent {

  promptService = inject(PromptService)

  addExample(){
    this.promptService.examples.set(
      [
        ...this.promptService.examples(),
        {
          name: "New Example",
          description: '',
          content: '',
        }
      ]
    )
  }

  emitUpdate(){
    this.promptService.examples.set(
      [...this.promptService.examples()]
    )
  }


  deleteExample(index: number){
    this.promptService.examples.set(
      this.promptService.examples().filter((_, i) => i !== index)
    )
  }

}
