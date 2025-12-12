import { Component, Input, OnInit } from '@angular/core';
import { IDevice } from '../models/device';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  standalone: true,
})
export class DeviceComponent implements OnInit {
  @Input() device!: IDevice;

  constructor() {}

  ngOnInit() {}
}
