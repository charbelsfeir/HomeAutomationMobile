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
  collectionGroup,
  docData,
} from '@angular/fire/firestore';
import {
  BehaviorSubject,
  combineLatest,
  flatMap,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Devices, IDevice } from '../models/device';
import { User } from '../models/user';
import { IRoom, Rooms } from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  $devices = new BehaviorSubject<Devices>([]);

  constructor(private readonly _firestore: Firestore) {}

  getRooms(user: User): Observable<Rooms> {
    const roomsRef = collection(this._firestore, `users/${user.email}/rooms`);

    return collectionData(roomsRef, { idField: 'id' }) as Observable<Rooms>;
  }

  // getRoom(user: User, roomId?: string): Observable<IRoom> {
  //   if (roomId) {
  //     const roomsRef = collection(
  //       this._firestore,
  //       `users/${user.email}/rooms/${roomId}`
  //     );

  //     return collectionData(roomsRef, { idField: 'id' }) as Observable<IRoom>;
  //     // switchMap((rooms: Devices) => {
  //     //   if (!rooms.length) return of([]); // no rooms

  //     //   const roomsWithDevices$ = rooms.map((room) => {
  //     //     const devicesRef = collection(
  //     //       this._firestore,
  //     //       `users/${user.email}/rooms/${room.id}/devices`
  //     //     );

  //     //     return (
  //     //       collectionData(devicesRef, { idField: 'id' }) as Observable<Devices>
  //     //     ).pipe(map((devices) => ({ ...room, devices })));
  //     //   });

  //     //   return combineLatest(roomsWithDevices$);
  //     // })
  //   }
  //   // const roomsRef = collection(this._firestore, `users/${user.email}/rooms`);

  //   // return (
  //   //   collectionData(roomsRef, { idField: 'id' }) as Observable<Devices>
  //   // ).pipe(
  //   //   switchMap((rooms: Devices) => {
  //   //     if (!rooms.length) return of([]); // no rooms

  //   //     const roomsWithDevices$ = rooms.map((room) => {
  //   //       const devicesRef = collection(
  //   //         this._firestore,
  //   //         `users/${user.email}/rooms/${room.id}/devices`
  //   //       );

  //   //       return collectionData(devicesRef, {
  //   //         idField: 'id',
  //   //       }) as Observable<Devices>;
  //   //     });

  //   //     return combineLatest(roomsWithDevices$).pipe(
  //   //       map((devices) => devices.flat())
  //   //     );
  //   //   }),
  //   //   map((devices) => {
  //   //     return {
  //   //       id: 'All',
  //   //       devices,
  //   //     };
  //   //   })
  //   // );
  // }

  update(user: User, room: IRoom): void {
    const userRef = doc(
      this._firestore,
      `users/${user.email}/rooms/${room.id}`
    );

    updateDoc(userRef, { ...room });
  }
}
