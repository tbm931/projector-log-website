import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStateComponent } from './data-state.component';

describe('DataStateComponent', () => {
  let component: DataStateComponent;
  let fixture: ComponentFixture<DataStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
