import { IRoom } from './room';
import { User } from './user';

export interface IDevice {
  id: string;
  name: string;
  status: boolean;
  power?: number;
  current?: number;
  type?: string;
  room?: string;
  users?: User[];
  alarm?: any;
  timer?: any;
}

export type Devices = IDevice[];

export interface Toggle {}
