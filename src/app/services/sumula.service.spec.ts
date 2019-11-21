import { TestBed } from '@angular/core/testing';

import { SumulaService } from './sumula.service';

describe('SumulaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SumulaService = TestBed.get(SumulaService);
    expect(service).toBeTruthy();
  });
});
