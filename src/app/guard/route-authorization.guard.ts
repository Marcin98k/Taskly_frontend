import { CanActivateFn } from '@angular/router';

export const routeAuthorizationGuard: CanActivateFn = (route, state) => {
  return true;
};
