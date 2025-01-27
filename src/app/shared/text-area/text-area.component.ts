import {Component, input, model} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss'
})
export class TextAreaComponent {
  label = input('')
  type = input('text')
  value = model('')
}
