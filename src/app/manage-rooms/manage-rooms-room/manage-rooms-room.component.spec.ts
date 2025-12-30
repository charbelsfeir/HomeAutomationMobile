import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManageRoomsRoomComponent } from './manage-rooms-room.component';

describe('ManageRoomsRoomComponent', () => {
  let component: ManageRoomsRoomComponent;
  let fixture: ComponentFixture<ManageRoomsRoomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ManageRoomsRoomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageRoomsRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
