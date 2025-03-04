import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  label = input('');
  value = model<any>(null);
  items = input<any[]>([]);
  transformItem = input<(item: any) => string>((item:any) => item);



}
