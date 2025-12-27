import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageRoomsPage } from './manage-rooms.page';

describe('ManageRoomsPage', () => {
  let component: ManageRoomsPage;
  let fixture: ComponentFixture<ManageRoomsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
