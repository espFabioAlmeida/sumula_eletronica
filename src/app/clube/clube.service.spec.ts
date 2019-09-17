import { TestBed } from '@angular/core/testing';

import { ClubeService } from './clube.service';

describe('ClubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClubeService = TestBed.get(ClubeService);
    expect(service).toBeTruthy();
  });
});
