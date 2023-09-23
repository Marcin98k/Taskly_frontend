import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routeAuthorizationGuard } from './route-authorization.guard';

describe('routeAuthorizationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routeAuthorizationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
