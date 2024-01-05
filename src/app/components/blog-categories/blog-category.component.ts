import {Component, Input, signal} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {CommonModule} from "@angular/common";
import {TagModule} from "primeng/tag";






@Component({
  selector: 'rb-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss'],
  standalone: true,
  imports: [ButtonModule, CommonModule, TagModule],
})
export class RbPost {

constructor() {
}



  @Input() data:any = '' ;


}
