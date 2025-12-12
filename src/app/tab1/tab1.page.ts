import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { TabComponent } from '../tab/tab.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RoomComponent } from './room/room.component';

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
  ],
})
export class Tab1Page {
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
      name: 'all',
    },
    {
      id: 1,
      label: 'Livingroom',
      active: false,
      name: 'livingroom',
    },
  ];

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
    private readonly _route: ActivatedRoute
  ) {}

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
}
