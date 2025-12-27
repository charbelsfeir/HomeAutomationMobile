import { Devices } from './device';
import { Rooms } from './room';

export interface User {
  id: string;
  email: string;
  isNotificationActive?: boolean;
  deleted?: boolean;
  rooms?: Rooms;
  devices?: Devices;
}
