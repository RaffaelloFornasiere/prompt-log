import {Component, inject, OnDestroy} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  TabNameDirective,
  TabsComponent,
} from "../../shared/tabs/tabs.component";
import {UserSettings} from '../../models/user-settings.model';
import {StorageService} from '../../core/storage/storage.service';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';
import {InputComponent} from '../../shared/input/input.component';

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [
    FormsModule,
    TabsComponent,
    TabNameDirective,
    ShineEffectDirective,
    InputComponent,
  ],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent implements OnDestroy{
  settings : UserSettings | undefined = undefined;
  storageService = inject(StorageService);

  constructor() {
    this.storageService.getDocument().subscribe((userSettings) => {
      this.settings = userSettings.settings;
      console.log(this.settings);
    });
  }

  ngOnDestroy() {
    this.storageService.updateDocument({settings: this.settings});
  }

  delimiters = {
    xml : {
      start: '<{sectionName}>',
      end: '</{sectionName}>',
      name: 'xml'
    },
    line: {
      start: '---start-{sectionName}---',
      end: '---end-{sectionName}---',
      name: 'line'
    }
  }

  setDelimiter(delimiter: string) {
    this.settings!.delimiter = (this.delimiters as any)[delimiter];
  }

  addServer() {
    this.settings!.servers.push({
      name: '',
      baseUrl: '',
      modelName: '',
      apiKey: '',
      active: false
    });
  }

  toggleActiveServer(index: number, value: boolean) {
    this.settings!.servers.forEach((server, i) => {
      if (i === index) {
        server.active = value;
      } else {
        server.active = false;
      }
    });
  }

  deleteServer(index: number) {
    this.settings!.servers.splice(index, 1);
  }

}
