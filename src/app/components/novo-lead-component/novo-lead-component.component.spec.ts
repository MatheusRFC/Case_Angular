import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoLeadComponentComponent } from './novo-lead-component.component';

describe('NovoLeadComponentComponent', () => {
  let component: NovoLeadComponentComponent;
  let fixture: ComponentFixture<NovoLeadComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoLeadComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoLeadComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
