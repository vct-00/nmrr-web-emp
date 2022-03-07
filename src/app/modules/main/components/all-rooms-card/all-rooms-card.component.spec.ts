import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRoomsCardComponent } from './all-rooms-card.component';

describe('AllRoomsCardComponent', () => {
  let component: AllRoomsCardComponent;
  let fixture: ComponentFixture<AllRoomsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRoomsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRoomsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
