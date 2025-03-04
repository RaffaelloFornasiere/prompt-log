import {AfterViewInit, Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PromptService } from '../service/prompt.service';
import { TextAreaComponent } from '../../shared/text-area/text-area.component';
import { HttpClient } from '@angular/common/http';
import { InputComponent } from '../../shared/input/input.component';
import * as prompt from './improve-prompt.prompt'

@Component({
  selector: "app-task-description",
  standalone: true,
  imports: [FormsModule, TextAreaComponent, InputComponent,
  ],
  templateUrl: "./task-description.component.html",
  styleUrl: "./task-description.component.scss",
})
export class TaskDescriptionComponent{
  protected http = inject(HttpClient);
  promptService = inject(PromptService);


  improveWithAI() {
    let user_message = prompt.default;
    user_message = user_message.replace(
      "{{task_description}}",
      this.promptService.taskDescription(),
    );
    let variablesText = "";
    if (
      this.promptService.variables() &&
      this.promptService.variables().length > 0
    ) {
      this.promptService.variables().forEach((variable: any) => {
        variablesText += `- ${variable.name}: ${variable.description}`;
      });
    }
    user_message = user_message.replace("{{variables}}", variablesText);

    const messages = [{ role: "user", content: user_message }];
    const activeServer = this.promptService
      .settings()
      .servers.find((server: any) => server.active);
    this.http
      .post(
        activeServer.baseUrl + "/v1/chat/completions",
        {
          ...(activeServer.modelName ? { model: activeServer.modelName } : {}),
          messages,
        },
        {
          headers: {
            Authorization: `Bearer ${activeServer.apiKey}`,
            "Content-Type": "application/json",
          },
        },
      )
      .subscribe((response: any) => {
        // get the prompt between the <prompt> tags
        console.log(response.choices[0].message.content);
        const newPrompt = response.choices[0].message.content.match(
          /<prompt>([\s\S]*?)<\/prompt>/,
        )[1];
        const improveSuggestions = response.choices[0].message.content.match(
          /<improve>([\s\S]*?)<\/improve>/,
        );
        console.log(newPrompt);
        this.promptService.taskDescription.set(newPrompt);
      });
  }

  addVariable() {
    this.promptService.variables.set([
      ...this.promptService.variables(),
      { name: "", description: "" },
    ]);
  }

  protected readonly prompt = prompt;
}
