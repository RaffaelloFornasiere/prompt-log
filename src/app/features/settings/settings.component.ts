import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  TabNameDirective,
  TabsComponent,
} from "../../shared/tabs/tabs.component";
import { InputComponent } from "../../shared/input/input.component";
import { PromptService } from "../service/prompt.service";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [FormsModule, TabsComponent, TabNameDirective, InputComponent],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {
  protected promptService = inject(PromptService);

  get settings() {
    return this.promptService.settings();
  }

  set delimiter(value: string) {
    this.promptService.settings.set({ ...this.settings, delimiter: value });
  }

  get delimiter() {
    return this.settings.delimiter;
  }

  set impersonate(value: string | null) {
    this.promptService.settings.set({ ...this.settings, impersonate: value });
  }

  get impersonate() {
    return this.settings.impersonate;
  }

  set baseUrl(value: string) {
    this.promptService.settings.set({ ...this.settings, baseUrl: value });
  }

  get baseUrl() {
    return this.settings.baseUrl;
  }

  set modelName(value: string) {
    this.promptService.settings.set({ ...this.settings, modelName: value });
  }

  get modelName() {
    return this.settings.modelName;
  }

}
