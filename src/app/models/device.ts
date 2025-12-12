export interface IDevice {
  id: number;
  name: string;
  status: boolean;
  amps?: number;
  alarm?: any;
  timer?: any;
}

export type Devices = IDevice[];

export interface Toggle {}
