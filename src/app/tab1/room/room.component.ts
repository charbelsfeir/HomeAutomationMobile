import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Devices } from 'src/app/models/device';
import { DeviceComponent } from 'src/app/device/device.component';
import { DeviceService } from 'src/app/services/device.service';
import { IRoom } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  standalone: true,
  imports: [DeviceComponent, CommonModule],
})
export class RoomComponent implements OnInit, OnChanges {
  @Input() tab?: {
    id: number;
    label: string;
    active: boolean;
    name: string;
  };

  @Input() room?: IRoom;

  devices$ = new Observable<Devices>();

  constructor(
    private readonly _deviceService: DeviceService,
    private readonly _router: Router
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['tab']?.currentValue) {
      if (localStorage.getItem('userID')) {
        this.devices$ = this._deviceService.getByRoom(
          {
            id: '',
            email: localStorage.getItem('userID')!,
          },
          this.tab?.name === 'All' ? undefined : this.tab?.name
        );
        // this.room$ = this._roomService.getRoom(
        //   {
        //     id: '',
        //     email: localStorage.getItem('userID')!,
        //   },
        //   this.tab?.name === 'all' ? undefined : this.tab?.name
        // );
      }
    }
  }

  addDevice(): void {
    this._router.navigate(['/add-device'], {
      queryParams: {
        room: this.room?.id,
      },
    });
  }
}
