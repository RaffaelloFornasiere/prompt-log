import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PromptService } from '../service/prompt.service';
import { TextAreaComponent } from '../../shared/text-area/text-area.component';
import { HttpClient } from '@angular/common/http';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-task-description',
  standalone: true,
  imports: [FormsModule, TextAreaComponent, InputComponent],
  templateUrl: './task-description.component.html',
  styleUrl: './task-description.component.scss'
})
export class TaskDescriptionComponent {
  protected http = inject(HttpClient);
  promptService = inject(PromptService);

  improveWithAI() {
    let user_message = `
Help me build an llm prompt for the following task:
${this.promptService.taskDescription()}
Build the prompt and put it between the <prompt> tags.
`;
    if (this.promptService.variables() && this.promptService.variables().length > 0) {
      user_message += `
Use the following variables in the prompt to make it dynamic. The variables MUST be surrounded by double curly braces. For example, {{variable_name}}.
Variables:
`;
      this.promptService.variables().forEach((variable:any) => {
        user_message += `
- ${variable.name}: ${variable.description}
`;
      });
    }

    const messages = [{ role: 'user', content: user_message }];
    this.http
      .post(
        this.promptService.settings().baseUrl + '/v1/chat/completions',
        {
          messages
        }
      )
      .subscribe((response: any) => {
        const newPrompt = response.choices[0].message.content.replace(/<\s*\/?\s*prompt\s*\/?\s*>/g, '');
        console.log(newPrompt);
        this.promptService.taskDescription.set(newPrompt);
      });
  }

  addVariable() {
    this.promptService.variables.set([
      ...this.promptService.variables(),
      { name: '', description: '' }
    ]);
  }
}
