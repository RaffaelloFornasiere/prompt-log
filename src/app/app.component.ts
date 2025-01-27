import { Component, inject, OnDestroy } from "@angular/core";
import { RouterOutlet } from '@angular/router';
import {SidenavComponent} from './layouts/sidenav/sidenav.component';
import {MainComponent} from './layouts/main/main.component';
import { PromptService } from './features/service/prompt.service';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, MainComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnDestroy {
  promptService = inject(PromptService);
  title = "prompt-generator";

  ngOnDestroy() {
    this.promptService.save();
  }

}
