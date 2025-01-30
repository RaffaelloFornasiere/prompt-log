import { AfterViewInit, Component, effect, ElementRef, input, model, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: "app-text-area",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./text-area.component.html",
  styleUrl: "./text-area.component.scss",
})
export class TextAreaComponent implements AfterViewInit {
  @ViewChild("input", { static: true }) input!: ElementRef<HTMLTextAreaElement>;
  autoResize = input(false);
  label = input("");
  type = input("text");
  value = model("");

  ngAfterViewInit() {
    console.log("input", this.input);
  }
  constructor() {
    effect(() => {
      if (this.autoResize()) {
        this.input.nativeElement.style.height = "auto";
        this.input.nativeElement.style.height = this.input.nativeElement.scrollHeight + "px";
      }
    });
  }
}
