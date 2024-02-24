import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreateComponent } from './main/components/task-create/task-create.component';
import { TaskUpdateComponent } from './main/components/task-update/task-update.component';
import { TaskDetailsComponent } from './main/components/task-details/task-details.component';
import { UserComponent } from './main/user/user.component';
import { SettingsComponent } from './main/settings/settings.component';
import { RouteAuthorizationGuard } from './core/guard/route-authorization.guard';
import { TaskListComponent } from './main/components/task-list/task-list.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [RouteAuthorizationGuard]
  },
  {
    path: 'create-task',
    component: TaskCreateComponent,
    canActivate: [RouteAuthorizationGuard]
  },
  {
    path: 'update-task/:id',
    component: TaskUpdateComponent,
    canActivate: [RouteAuthorizationGuard]
  },
  {
    path: 'task-details/:id',
    component: TaskDetailsComponent,
    canActivate: [RouteAuthorizationGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [RouteAuthorizationGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [RouteAuthorizationGuard]
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
