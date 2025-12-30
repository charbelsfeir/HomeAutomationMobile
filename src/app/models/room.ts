import { Devices } from './device';

export interface IRoom {
  id: string;
  name: string;
  userEmail?: string;
}

export type Rooms = IRoom[];
