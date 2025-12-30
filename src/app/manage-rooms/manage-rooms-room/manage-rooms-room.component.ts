import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IRoom } from '../../models/room';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-manage-rooms-room',
  templateUrl: './manage-rooms-room.component.html',
  styleUrls: ['./manage-rooms-room.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class ManageRoomsRoomComponent implements OnInit {
  @Input() room!: IRoom;
  @ViewChild('roomInput') roomInputEl!: ElementRef;
  isEditing = false;
  roomFormControl = new FormControl('', [Validators.required]);

  constructor(private readonly _roomService: RoomService) {}

  ngOnInit() {
    this.roomFormControl.setValue(this.room.name);
  }

  edit(): void {
    this.isEditing = true;
    setTimeout(() => this.roomInputEl.nativeElement.focus(), 0);
  }

  save(): void {
    if (this.roomFormControl.valid) {
      this.isEditing = false;
      this.room = {
        id: this.room.id!,
        name: this.roomFormControl.value!,
        userEmail: localStorage.getItem('userID')!.toLocaleLowerCase(),
      };
      this._roomService.update(this.room).subscribe();
    }
  }

  delete(): void {
    this.room = {
      id: this.room.id!,
      name: this.roomFormControl.value!,
      userEmail: localStorage.getItem('userID')!.toLocaleLowerCase(),
    };
    this._roomService.delete(this.room).subscribe();
  }
}
