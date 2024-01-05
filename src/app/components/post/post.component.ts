import { Component} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {CommonModule} from "@angular/common";
import {ApiRoutesService} from "../../api-routes/api-routes.service";


@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [ButtonModule,CommonModule],
})
export class RbHeader {

constructor() {
}

}
