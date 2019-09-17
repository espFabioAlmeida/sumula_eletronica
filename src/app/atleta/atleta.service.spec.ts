import { TestBed } from '@angular/core/testing';

import { AtletaService } from './atleta.service';

describe('AtletaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtletaService = TestBed.get(AtletaService);
    expect(service).toBeTruthy();
  });
});
