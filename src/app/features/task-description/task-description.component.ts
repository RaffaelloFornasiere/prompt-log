import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-description',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './task-description.component.html',
  styleUrl: './task-description.component.scss',
})
export class TaskDescriptionComponent {

  description = '';

}
