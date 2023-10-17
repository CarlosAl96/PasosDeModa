import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAccordionComponent } from './filter-accordion.component';

describe('FilterAccordionComponent', () => {
  let component: FilterAccordionComponent;
  let fixture: ComponentFixture<FilterAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterAccordionComponent]
    });
    fixture = TestBed.createComponent(FilterAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
