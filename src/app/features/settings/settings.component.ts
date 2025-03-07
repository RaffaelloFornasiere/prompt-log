import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  TabNameDirective,
  TabsComponent,
} from "../../shared/tabs/tabs.component";
import { InputComponent } from "../../shared/input/input.component";
import { SelectComponent } from "../../shared/select/select.component";
import {ShineEffectDirective} from '../../shared/directives/shine.directive';

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [
    FormsModule,
    TabsComponent,
    TabNameDirective,
    InputComponent,
    ShineEffectDirective,
  ],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {

  get settings() {
    return {} as any
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
  }


  get delimiter() {
    return Object.keys(this.delimiters).find(delimiter => this.delimiters[delimiter].name === this.settings.delimiter.name);
  }

  set impersonate(value: string | null) {
  }

  get impersonate() {
    return this.settings.impersonate;
  }

  set baseUrl(value: string) {
  }

  get baseUrl() {
    return this.settings.baseUrl;
  }

  set modelName(value: string) {
  }

  get modelName() {
    return this.settings.modelName;
  }

  addServer() {

  }

  updateServers() {
    this.settings.servers.forEach((server: any) => {
      // remove trailing slash
      server.baseUrl = server.baseUrl.replace(/\/$/, "");
    })

  }

  toggleActiveServer(index: number, active: boolean) {
    this.settings.servers.forEach((server: any, i: number) => {
      server.active = i === index;
    });

  }

  deleteServer(index: number) {

  }
}
