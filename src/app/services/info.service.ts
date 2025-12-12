import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Unsubscribe } from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import { IInfo } from '../shared/models/info';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  $info = new BehaviorSubject<IInfo>({
    batteryCapacity: 0,
    elecState: 0,
    heaterValue: 0,
    loadCurrent: 0,
    loadPower: 0,
    PVpower: 0,
  });

  constructor(private readonly _firestore: Firestore) {}

  getInfo(): Unsubscribe {
    const _query = query(collection(this._firestore, 'secondary'));
    return onSnapshot(_query, (snapshot) => {
      snapshot.forEach((doc) => {
        this.$info.next(<IInfo>doc.data());
      });
    });
  }

  updateInfo(isActive: boolean): void {
    const userRef = doc(this._firestore, 'info/AllowInfo');

    updateDoc(userRef, { isActive });
  }
}
