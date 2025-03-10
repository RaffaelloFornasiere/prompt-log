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
  ],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {


}
