import { computed, effect, Injectable, signal } from "@angular/core";
import { ToolType } from "../actions/actions.component";
import { Example } from "../examples/examples.component";
import { toObservable } from "@angular/core/rxjs-interop";
import { debounceTime } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PromptService {
  actions = signal<ToolType[]>([]);
  taskDescription = signal("");
  variables = signal<any>([]);
  examples = signal<Example[]>([]);
  settings = signal<any>({
    delimiter: ",",
    impersonate: null,
    baseUrl: "http://localhost:1234",
    modelName: "",
  });


  constructor() {
    this.load();
    effect(() => {
      this.save();
    });
  }

  save() {
    console.log("saving");
    window.localStorage.setItem(
      "prompt",
      JSON.stringify({
        actions: this.actions(),
        taskDescription: this.taskDescription(),
        variables: this.variables(),
        examples: this.examples(),
        settings: this.settings(),
      }),
    );
  }

  load() {
    const data = window.localStorage.getItem("prompt");
    if (data) {
      const parsed = JSON.parse(data);
      this.actions.set(parsed.actions);
      this.taskDescription.set(parsed.taskDescription);
      this.variables.set(parsed.variables);
      this.examples.set(parsed.examples);
      this.settings.set(parsed.settings);
    }
  }

}
