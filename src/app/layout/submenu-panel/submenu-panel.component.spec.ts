import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuPanelComponent } from './submenu-panel.component';

describe('SubmenuPanelComponent', () => {
  let component: SubmenuPanelComponent;
  let fixture: ComponentFixture<SubmenuPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmenuPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
