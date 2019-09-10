import { TestBed } from '@angular/core/testing';

import { ArbitroService } from './arbitro.service';

describe('ArbitroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArbitroService = TestBed.get(ArbitroService);
    expect(service).toBeTruthy();
  });
});
