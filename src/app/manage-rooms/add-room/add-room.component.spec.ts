import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddRoomComponent } from './add-room.component';

describe('AddRoomComponent', () => {
  let component: AddRoomComponent;
  let fixture: ComponentFixture<AddRoomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddRoomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
