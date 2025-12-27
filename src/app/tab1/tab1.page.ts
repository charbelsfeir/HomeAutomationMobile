import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { TabComponent } from '../tab/tab.component';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { RoomComponent } from './room/room.component';
import { DeviceService } from '../services/device.service';
import { RoomService } from '../services/room.service';
import { Observable, take, tap } from 'rxjs';
import { IRoom, Rooms } from '../models/room';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    TabComponent,
    RouterOutlet,
    RoomComponent,
    CommonModule,
    RouterModule,
  ],
})
export class Tab1Page implements OnInit {
  displayDropdown = false;
  tabs: {
    id: number;
    label: string;
    active: boolean;
    name: string;
  }[] = [
    {
      id: 0,
      label: 'All',
      active: true,
      name: 'All',
    },
  ];

  rooms$?: Observable<Rooms>;
  rooms: Rooms = [];

  get selectedTab(): {
    id: number;
    label: string;
    active: boolean;
    name: string;
  } {
    return this.tabs.find((tab) => tab.active) ?? this.tabs[0];
  }

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _roomService: RoomService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('userID')) {
      this._roomService
        .getRooms({
          id: '',
          email: localStorage.getItem('userID')!,
        })
        .pipe(
          take(1),
          tap((rooms: Rooms) => {
            rooms.forEach((room) => {
              this.tabs.push({
                active: false,
                id: this.tabs.length,
                label: room.id,
                name: room.id,
              });
            });
            this.rooms = rooms;
          })
        )
        .subscribe();
    }
  }

  filterRooms(): IRoom {
    if (this.selectedTab.id === 0) {
      return {
        id: 'All',
        name: 'All',
      };
    }

    return {
      id: this.selectedTab.name,
      name: this.selectedTab.name,
    };
  }

  changeTab(t: {
    id: number;
    label: string;
    active: boolean;
    name: string;
  }): void {
    this.tabs = this.tabs.map((tab) => {
      if (tab.id === t.id) {
        return {
          ...tab,
          active: true,
        };
      }
      return {
        ...tab,
        active: false,
      };
    });
  }

  addDevice(): void {
    this._router.navigate(['/add-device'], {
      queryParams: {
        room: this.selectedTab.name,
      },
    });
  }
}
