import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TabComponent } from '../tab/tab.component';
import { RouterModule } from '@angular/router';
import { RoomService } from '../services/room.service';
import { AddRoomComponent } from './add-room/add-room.component';
import { ModalController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-manage-rooms',
  templateUrl: './manage-rooms.page.html',
  styleUrls: ['./manage-rooms.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    TabComponent,
    RouterModule,
    AddRoomComponent,
    IonicModule,
  ],
})
export class ManageRoomsPage implements OnInit {
  showAddRoomModal = false;
  room$ = this._roomService.getRooms({
    id: '',
    email: localStorage.getItem('userID')!,
  });
  constructor(
    private readonly _roomService: RoomService,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddRoomComponent,
      // cssClass: 'custom-modal',
      // breakpoints: [0, 0.5, 1],
      // initialBreakpoint: 0.5,
    });

    await modal.present();
  }
}
