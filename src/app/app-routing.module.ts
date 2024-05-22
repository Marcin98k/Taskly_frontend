import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './main/components/user/user.component';
import { SettingsComponent } from './main/components/settings/settings.component';
import { RouteAuthorizationGuard } from './core/guard/route-authorization.guard';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [RouteAuthorizationGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent
    // canActivate: [RouteAuthorizationGuard]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
