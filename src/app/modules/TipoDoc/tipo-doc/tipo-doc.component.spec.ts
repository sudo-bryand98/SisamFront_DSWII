import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDocComponent } from './tipo-doc.component';

describe('TipoDocComponent', () => {
  let component: TipoDocComponent;
  let fixture: ComponentFixture<TipoDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
