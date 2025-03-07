import {Component, effect, EventEmitter, forwardRef, input, Input, model, Output} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {set} from '@angular/fire/database';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  label = input('')
  type = input('text')
  @Input() value :any
  @Output() valueChange = new EventEmitter()
  onChange = (value: any) => {}
  onTouched = () => {}

  constructor() {

  }

  setValue(value: any) {
    this.value = value
    this.onChange(value)
    this.onTouched()
    this.valueChange.emit(value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  writeValue(obj: any): void {
    this.value = obj
  }


  protected readonly set = set;
}
