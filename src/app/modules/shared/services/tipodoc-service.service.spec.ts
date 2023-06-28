import { TestBed } from '@angular/core/testing';

import { TipodocServiceService } from './tipodoc-service.service';

describe('TipodocServiceService', () => {
  let service: TipodocServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipodocServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
