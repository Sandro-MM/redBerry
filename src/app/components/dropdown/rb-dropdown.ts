import { Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, FormsModule,
} from '@angular/forms';
import {DatePipe, NgClass} from "@angular/common";
import {InputMaskModule} from "primeng/inputmask";
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'rb-date-picker',
  templateUrl: './rb-date-picker.html',
  styleUrls: ['./rb-date-picker.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RbDatePicker,
      multi: true,
    },
  ],
  imports: [
    NgClass,
    FormsModule,
    InputMaskModule,
    DatePipe,
    CalendarModule
  ]
})
export class RbDatePicker implements ControlValueAccessor, OnInit {
  todayDate: Date = new Date();
  try = 0;
  @Input() label!: string | null;
  @Input() placeholder!: string | null;
  @Input() value!: Date | undefined;
  @Input() inputDisabled = false;
  @Input() control!: AbstractControl | null | undefined;
  @Input() validation:any;
  required: boolean = false;
  @Input() maxDate!: Date;
  minDate = new Date();
  constructor() {}

  ngOnInit() {
    this.inputRequired()
    console.log(this.control?.value)
  }
  inputRequired(){
    this.control?.errors?.['required'] == true? this.required = true : this.required = false
  }
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateChanges() {
    this.onChange(this.value);
  }

  protected readonly Date = Date;
}
