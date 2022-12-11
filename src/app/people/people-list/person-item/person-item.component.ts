import { Component, Input } from '@angular/core';
import { People } from '../../model/people.model';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.css']
})
export class PersonItemComponent {
  @Input() person: People;
  @Input() id: number;
}
