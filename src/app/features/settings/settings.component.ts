import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  TabNameDirective,
  TabsComponent,
} from "../../shared/tabs/tabs.component";
import { InputComponent } from "../../shared/input/input.component";
import { PromptService } from "../service/prompt.service";
import { SelectComponent } from "../../shared/select/select.component";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [
    FormsModule,
    TabsComponent,
    TabNameDirective,
    InputComponent,
  ],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {
  protected promptService = inject(PromptService);

  get settings() {
    return this.promptService.settings();
  }

  delimiters:any = {
    line: {
      name: "line",
      start: "---Start {sectionName}---",
      end: "---End {sectionName}---",
    },
    xml: {
      name: "xml",
      start: "<{sectionName}>",
      end: "</{sectionName}>",
    },
  }

  setDelimiter(value: string) {
    this.promptService.settings.set({ ...this.settings, delimiter: this.delimiters[value] });
  }


  get delimiter() {
    return Object.keys(this.delimiters).find(delimiter => this.delimiters[delimiter].name === this.settings.delimiter.name);
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

  addServer() {
    this.promptService.settings.set({
      ...this.settings,
      servers: [...this.settings.servers, { name: "", url: "", apiKey: "" }],
    });
  }

  updateServers() {
    this.settings.servers.forEach((server: any) => {
      // remove trailing slash
      server.baseUrl = server.baseUrl.replace(/\/$/, "");
    })
    this.promptService.settings.set({
      ...this.settings,
    });
  }

  toggleActiveServer(index: number, active: boolean) {
    this.settings.servers.forEach((server: any, i: number) => {
      server.active = i === index;
    });
    this.promptService.settings.set({
      ...this.settings,
    });
  }

  deleteServer(index: number) {
    this.promptService.settings.set({
      ...this.settings,
      servers: this.settings.servers.filter((_: any, i: number) => i !== index),
    });
  }
}
