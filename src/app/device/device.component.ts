import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IDevice } from '../models/device';
import { DeviceService } from '../services/device.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class DeviceComponent implements OnInit, OnDestroy, OnChanges {
  private destroyRef$ = new Subject<void>();
  @Input() device!: IDevice;
  statusControl = new FormControl(false);

  constructor(private readonly _deviceService: DeviceService) {}

  ngOnInit() {
    this.statusControl.valueChanges
      .pipe(
        takeUntil(this.destroyRef$),
        tap((status) => {
          console.log(status);
          this._deviceService.update(
            {
              id: '',
              email: localStorage.getItem('userID')!,
            },
            {
              ...this.device,
              status: status ?? false,
            }
          );
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['device']?.currentValue) {
      this.device = changes?.['device']?.currentValue;
      this.statusControl.setValue(this.device.status);
    }
  }

  ngOnDestroy(): void {
    this.destroyRef$.next();
    this.destroyRef$.complete();
  }
}
