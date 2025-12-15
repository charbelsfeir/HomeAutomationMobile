import { Devices } from './device';

export interface IRoom {
  id: string;
  devices: Devices;
}

export type Rooms = IRoom[];
