import { TestBed } from '@angular/core/testing';

import { EnvoirnmentService } from './envoirnment.service';

describe('EnvoirnmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnvoirnmentService = TestBed.get(EnvoirnmentService);
    expect(service).toBeTruthy();
  });
});
