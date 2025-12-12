import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Unsubscribe,
  updateDoc,
} from 'firebase/firestore';
import { Devices, IDevice } from '../models/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  $devices = new BehaviorSubject<Devices>([]);

  constructor(private readonly _firestore: Firestore) {}

  initDevices(): void {
    const devices: Devices = [
      {
        ID: 1,
        name: 'Water heater M',
        amps: 1,
        status: false,
      },
      {
        ID: 2,
        name: 'Water heater E',
        amps: 1,
        status: true,
      },
    ];
    devices.forEach((device) => {
      setDoc(doc(this._firestore, `devices/${device.ID}`), device);
      // from(addDoc(collection(this._firestore, `devices/${device.id}`), device));
    });
  }

  getDevices(): Unsubscribe {
    const _query = query(collection(this._firestore, 'devices'));
    return onSnapshot(_query, (snapshot) => {
      const devices: Devices = [];
      snapshot.forEach((doc) => {
        devices.push(<IDevice>doc.data());
      });

      this.$devices.next(devices);
    });
  }

  update(device: IDevice): void {
    const userRef = doc(this._firestore, `devices/${device.ID}`);

    updateDoc(userRef, { ...device });
  }
}
