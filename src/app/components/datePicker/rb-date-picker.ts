import { Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, AbstractControl, FormsModule,
} from '@angular/forms';
import {NgClass} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'rb-input',
  templateUrl: './rb-input.html',
  styleUrls: ['./rb-input.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Rb_Input,
      multi: true,
    },
  ],
  imports: [
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    InputTextModule
  ]
})
export class Rb_Input implements ControlValueAccessor, OnInit {
  try = 0;
  @Input() label!: string | null;
  @Input() placeholder!: string | null;
  @Input() value!: string | null;
  @Input() inputDisabled = false;
  @Input() control!: AbstractControl | null | undefined;
  @Input() validation:any;
  required: boolean = false;

  constructor() {}

  ngOnInit() {
    this.inputRequired()
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
}
