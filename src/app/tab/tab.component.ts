import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

addIcons(allIcons);
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  standalone: true,
})
export class TabComponent {
  constructor() {}
}
