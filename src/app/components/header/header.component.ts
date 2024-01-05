import { Component} from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [ButtonModule],
})
export class RbHeader {

}
