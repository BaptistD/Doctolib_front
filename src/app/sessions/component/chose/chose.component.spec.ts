import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoseComponent } from './chose.component';

describe('ChoseComponent', () => {
  let component: ChoseComponent;
  let fixture: ComponentFixture<ChoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
