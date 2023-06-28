import { TestBed } from '@angular/core/testing';

import { TipoDocService } from './tipo-doc.service';

describe('TipoDocService', () => {
  let service: TipoDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
