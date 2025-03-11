import {Component, model} from '@angular/core';

@Component({
  selector: 'app-expansion',
  standalone: true,
    imports: [
    ],
  templateUrl: './expansion.component.html',
  styleUrl: './expansion.component.scss'
})
export class ExpansionComponent {
  opened = model<boolean>(false);

}
