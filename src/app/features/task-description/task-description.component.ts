import {AfterViewInit, Component, inject, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TextAreaComponent} from '../../shared/text-area/text-area.component';
import {HttpClient} from '@angular/common/http';
import {InputComponent} from '../../shared/input/input.component';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';
import {ActivatedRoute} from '@angular/router';
import {Prompt} from '../../models/prompt.model';
import prompt from './improve-prompt.prompt';
import {ToastService} from '../../shared/toast/toast.service';
import {of, switchMap} from 'rxjs';
import {UserSettings} from '../../models/user-settings.model';
import {PromptsService} from '../../services/prompts.service';
import {StorageService} from '../../core/storage/storage.service';

@Component({
  selector: "app-task-description",
  standalone: true,
  imports: [FormsModule, TextAreaComponent, InputComponent, ShineEffectDirective,
  ],
  templateUrl: "./task-description.component.html",
  styleUrl: "./task-description.component.scss",
})
export class TaskDescriptionComponent{
  protected activatedRoute = inject(ActivatedRoute);
  protected toastService = inject(ToastService);
  protected storageService = inject(StorageService);
  protected promptService = inject(PromptsService);
  protected http = inject(HttpClient);
  prompt: Prompt | undefined = undefined;


  constructor() {
    this.activatedRoute.data.subscribe(({prompt}) => {
      this.prompt = prompt;
    });
  }


  save() {
    this.promptService.updatePrompt(this.prompt!).subscribe();
  }


  improveWithAI() {
    if (!this.prompt?.taskDescription) {
      this.toastService.addToast({message: 'Please enter a task description', type: 'warning'});
      return;
    }
    let user_message = prompt;
    user_message = user_message.replace(
      "{{task_description}}",
      this.prompt?.taskDescription,
    );
    let variablesText = "";
    if (
      this.prompt.variables &&
      this.prompt.variables.length > 0
    ) {
      this.prompt.variables.forEach((variable: any) => {
        variablesText += `- ${variable.name}: ${variable.description}`;
      });
    }
    user_message = user_message.replace("{{variables}}", variablesText);

    const messages = [{role: "user", content: user_message}];
    this.storageService.getDocument('')
      .pipe(
        switchMap(({settings}: { settings: UserSettings }) => {
          const activeServer = settings.servers.find((server) => server.active)!

          return this.http
            .post(
              activeServer.baseUrl + "/v1/chat/completions",
              {
                ...(activeServer.modelName ? {model: activeServer.modelName} : {}),
                messages,
              },
              {
                headers: {
                  Authorization: `Bearer ${activeServer.apiKey}`,
                },
              },
            )

        })
      ).subscribe((response: any) => {
      const content = response.choices[0].message.content;
      console.log(content);
      let newPrompt = content.match(
        /\n\s*<prompt>([\s\S]*?)<\/prompt>/,
      )[1]

      console.log(newPrompt);
      const improveSuggestions = content.match(
        /\n\s*<improvements>([\s\S]*?)<\/improvements>/,
      )[1];
      this.prompt!.taskDescription = newPrompt;
    });


  }

  addVariable() {
    this.prompt?.variables.push({name: "", description: "", type: null});
  }

  deleteVariable(index: number) {
    this.prompt?.variables.splice(index, 1);
  }

}
