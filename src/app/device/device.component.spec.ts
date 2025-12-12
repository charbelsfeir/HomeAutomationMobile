import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeviceComponent } from './device.component';

describe('DeviceComponent', () => {
  let component: DeviceComponent;
  let fixture: ComponentFixture<DeviceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DeviceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
