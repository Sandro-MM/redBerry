import {Component, Input, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormsModule,
  ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {JsonPipe, NgClass, NgIf, NgStyle} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorPipe} from "../../../pipes/error.pipe";
import {TranslateModule} from "@ngx-translate/core";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'gs-input',
  templateUrl: './gs-input.html',
  styleUrls: ['./gs-input.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, NgStyle, ErrorPipe, NgClass, ErrorPipe, JsonPipe, TranslateModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Gs_Input,
      multi: true,
    },
  ],
})
export class Gs_Input implements ControlValueAccessor, OnInit {
  try = 0;
  @Input() label!: string | null;
  @Input() placeholder!: string | null;
  @Input() labelClass!: string | null;
  @Input() value!: string | null;
  @Input() type!: string;
  @Input() id!: string;
  @Input() inputDisabled = false;
  @Input() inputPlaceholder = '';
  @Input() inputClass = '';
  @Input() additionalClasses = '';
  @Input() control!: AbstractControl | null | undefined;
  @Input() errorClass!: string;
  @Input() tabIndex!: number;
  required: boolean = false;


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
