import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  BleClient,
  BleDevice,
  BluetoothLe,
  dataViewToText,
  textToDataView,
} from '@capacitor-community/bluetooth-le';
import { TabComponent } from '../tab/tab.component';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../services/device.service';
import { IDevice } from '../models/device';
import { CapacitorWifi } from '@capgo/capacitor-wifi';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    TabComponent,
    ReactiveFormsModule,
  ],
})
export class AddDevicePage implements OnInit, OnDestroy {
  private scanListener?: PluginListenerHandle;
  formGrp = new FormGroup({
    ssid: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  passToShow = false;
  devices: BleDevice[] = [];
  scanning = false;
  device?: BleDevice;
  roomName?: string;

  get connectBtnDisabled(): boolean {
    return this.devices.length !== 1;
  }

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _deviceService: DeviceService,
    private readonly _router: Router
  ) {
    this.roomName = this._route.snapshot.queryParams['room'];
  }

  async ngOnInit() {
    if (Capacitor.getPlatform() === 'web') return;

    this.getWifiSSID().then((ssid: string | null) => {
      this.formGrp.controls.ssid.setValue(ssid);
    });

    await BluetoothLe.initialize();

    this.startScan();

    this.scanListener = await BluetoothLe.addListener(
      'onScanResult',
      (result) => {
        if (!result?.device) return;

        const device: BleDevice = {
          deviceId: result.device.deviceId,
          name: result.device.name || 'Unknown',
          uuids: result.uuids,
        };

        if (!this.devices.find((d) => d.deviceId === device.deviceId)) {
          if (device.name?.startsWith('SNF')) {
            alert('Device found');
            this.devices.push(device);
            this.device = device;
          }

          if (this.devices.length > 1) {
            alert(
              'We detected more than 1 device powered on.\nPlease turn off one of them'
            );
            this.devices = [];
          }
        }
      }
    );
  }

  async getWifiSSID(): Promise<string | null> {
    try {
      // 1. Check and request permissions first
      const perm = await CapacitorWifi.checkPermissions();
      if (perm.location !== 'granted') {
        await CapacitorWifi.requestPermissions();
      }

      // 2. Get the SSID
      const { ssid } = await CapacitorWifi.getSsid();
      console.log('Current SSID:', ssid);
      return ssid;
    } catch (err) {
      console.error('Error fetching WiFi:', err);
      return null;
    }
  }

  async startScan() {
    if (this.scanning) return;

    this.devices = [];
    this.scanning = true;

    await BluetoothLe.requestLEScan({ allowDuplicates: false });

    // setTimeout(async () => {
    //   await BluetoothLe.stopLEScan();
    //   this.scanning = false;
    //   await this.startScan();
    // }, 1000 * 60);
  }

  ngOnDestroy() {
    this.scanListener?.remove();
  }

  async connect(event: any) {
    event.preventDefault();
    if (this.device && this.formGrp.valid) {
      BleClient.connect(this.device.deviceId)
        .then((res) => {
          BleClient.getServices(this.device!.deviceId)
            .then((services) => {
              services.forEach((service) => {
                service.characteristics.forEach((characteristic) => {
                  // alert(
                  //   `1 - service ${service.uuid} characteristics ${characteristic.uuid}`
                  // );
                  if (characteristic.properties.write) {
                    BleClient.write(
                      this.device!.deviceId,
                      service.uuid,
                      characteristic.uuid,
                      textToDataView(
                        `Wifi${this.formGrp.get('ssid')!.value}*${
                          this.formGrp.get('password')!.value
                        }$${localStorage.getItem('userID')}!`
                      )
                    ).catch((err) => alert(`Error writing ${err}`));
                    BleClient.startNotifications(
                      this.device!.deviceId,
                      service.uuid,
                      characteristic.uuid,
                      (value) => {
                        // 2. This callback runs every time the device sends data
                        const decodedData = dataViewToText(value);
                        alert(decodedData);
                        if (decodedData.startsWith('WIFI_CONNECTED')) {
                          this._registerDevice({
                            id: decodedData.replace('WIFI_CONNECTED', ''),
                            name: `Device-${
                              (Math.random() * 10000).toString().split('.')[0]
                            }`,
                            status: false,
                            room: this.roomName,
                          });
                          alert('Device added!');
                          this._router.navigate(['/']);
                        }
                      }
                    );
                  }
                });
              });
            })
            .catch((err) => alert(`Error services ${err}`));
        })
        .catch((error) => alert(`Error ${error}`));
    }
  }

  private _registerDevice(dev: IDevice): void {
    this._deviceService.addDevice(
      {
        id: '',
        email: localStorage.getItem('userID')!,
      },
      dev
    );
  }
}
