import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  collectionData,
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Unsubscribe,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, from, map, Observable, tap } from 'rxjs';
// import {
//   addDoc,
//   collection,
//   doc,
//   getDocs,
//   onSnapshot,
//   query,
//   setDoc,
//   Unsubscribe,
//   updateDoc,
// } from 'firebase/firestore';
import { Devices, IDevice } from '../models/device';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  $devices = new BehaviorSubject<Devices>([]);

  constructor(private readonly _firestore: Firestore) {}

  // initDevices(user: User): void {
  //   const devices: Devices = [
  //     {
  //       id: 1,
  //       name: 'Water heater M',
  //       status: false,
  //       type: 'switch',
  //       room: 'Livingroom',
  //     },
  //     {
  //       id: 2,
  //       name: 'Water heater E',
  //       status: true,
  //       type: 'switch',
  //       room: 'Livingroom',
  //     },
  //     {
  //       id: 3,
  //       name: 'Washer',
  //       status: true,
  //       type: 'switch',
  //       room: 'Bedroom',
  //     },
  //   ];
  //   devices.forEach((device) => {
  //     setDoc(doc(this._firestore, `users/${user.email}`), {});
  //     setDoc(
  //       doc(this._firestore, `users/${user.email}/rooms/${device.room}`),
  //       {}
  //     );
  //     setDoc(
  //       doc(
  //         this._firestore,
  //         `users/${user.email}/rooms/${device.room}/devices/${device.id}`
  //       ),
  //       device
  //     );
  //   });
  // }

  addDevice(user: User, device: IDevice): void {
    setDoc(doc(this._firestore, `users/${user.email}`), {});
    setDoc(doc(this._firestore, `users/${user.email}`), {});
    setDoc(
      doc(this._firestore, `users/${user.email}/devices/${device.id}`),
      device
    );
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

  update(user: User, device: IDevice): void {
    const userRef = doc(
      this._firestore,
      `users/${user.email}/rooms/${device.room}/devices/${device.id}`
    );

    updateDoc(userRef, { ...device });
  }

  changeStatus(user: User, device: IDevice): void {
    const userRef = doc(
      this._firestore,
      `users/${user.email}/devices/${device.id}`
    );

    updateDoc(userRef, { ...device });
  }

  getByRoom(user: User, room?: string): Observable<Devices> {
    const devicesRef = collection(
      this._firestore,
      `users/${user.email}/devices`
    );
    return (
      collectionData(devicesRef, { idField: 'id' }) as Observable<Devices>
    ).pipe(
      map((devices: Devices) =>
        devices.filter((device) => {
          if (room) {
            return device.room == room;
          }

          return device;
        })
      )
    );
  }
}
