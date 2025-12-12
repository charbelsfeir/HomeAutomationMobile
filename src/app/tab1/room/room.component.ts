import { Component, Input, OnInit } from '@angular/core';
import { Devices } from 'src/app/models/device';
import { DeviceComponent } from 'src/app/device/device.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  standalone: true,
  imports: [DeviceComponent],
})
export class RoomComponent implements OnInit {
  @Input() tab?: {
    id: number;
    label: string;
    active: boolean;
    name: string;
  };

  devices: Devices = [
    {
      id: 0,
      name: 'Heater',
      status: false,
    },
    {
      id: 0,
      name: 'Living room',
      status: false,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
