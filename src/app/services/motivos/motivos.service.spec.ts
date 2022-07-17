import { TestBed } from '@angular/core/testing';

import { MotivosService } from './motivos.service';

describe('MotivosService', () => {
  let service: MotivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
