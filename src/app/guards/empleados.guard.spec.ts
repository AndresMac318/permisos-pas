import { TestBed } from '@angular/core/testing';

import { EmpleadosGuard } from './empleados.guard';

describe('EmpleadosGuard', () => {
  let guard: EmpleadosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmpleadosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
