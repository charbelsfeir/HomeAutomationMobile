import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonItem,
    IonList,
    IonButton,
    IonContent,
    IonHeader,
    IonModal,
    IonTitle,
    IonToolbar,
  ],
})
export class AddRoomComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
