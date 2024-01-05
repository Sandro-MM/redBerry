import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  NgForm,
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
      useExisting: Gs_Input,
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
export class Gs_Input implements ControlValueAccessor, OnInit {
  try = 0;
  @Input() label!: string | null;
  @Input() placeholder!: string | null;
  @Input() value!: string | null;
  @Input() inputDisabled = false;
  @Input() control!: AbstractControl | null | undefined;
  @Input() validation:any;
  required: boolean = false;

  constructor() {}

  isErrorState(controlOrForm: FormControl | NgForm | null): boolean {
    if (controlOrForm instanceof FormControl) {
      // Handling a FormControl directly
      return !!(controlOrForm && controlOrForm.invalid && (controlOrForm.dirty || controlOrForm.touched));
    } else {
      // Assuming it's an NgForm
      const form = controlOrForm as NgForm;
      const isSubmitted = form && form.submitted;
      return !!(form && form.invalid && (form.dirty || isSubmitted));
    }
  }

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

  protected readonly NgClass = NgClass;
  protected readonly console = console;

}
