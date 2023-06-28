import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEncargadoComponent } from './new-encargado.component';

describe('NewEncargadoComponent', () => {
  let component: NewEncargadoComponent;
  let fixture: ComponentFixture<NewEncargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEncargadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
