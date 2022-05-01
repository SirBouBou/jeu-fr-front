import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusmoComponent } from './tusmo.component';

describe('TusmoComponent', () => {
  let component: TusmoComponent;
  let fixture: ComponentFixture<TusmoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TusmoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TusmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
