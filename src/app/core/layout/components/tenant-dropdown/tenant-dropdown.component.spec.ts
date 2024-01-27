import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDropdownComponent } from './tenant-dropdown.component';

describe('TenantDropdownComponent', () => {
  let component: TenantDropdownComponent;
  let fixture: ComponentFixture<TenantDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantDropdownComponent]
    });
    fixture = TestBed.createComponent(TenantDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
