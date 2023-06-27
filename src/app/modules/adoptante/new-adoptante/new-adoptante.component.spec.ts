import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdoptanteComponent } from './new-adoptante.component';

describe('NewAdoptanteComponent', () => {
  let component: NewAdoptanteComponent;
  let fixture: ComponentFixture<NewAdoptanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAdoptanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdoptanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
