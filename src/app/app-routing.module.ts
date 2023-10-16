import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { RouteAuthorizationGuard } from './guard/route-authorization.guard';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
{ path : 'tasks', component: TaskListComponent, canActivate: [RouteAuthorizationGuard]},
{ path: 'create-task', component: TaskCreateComponent , canActivate: [RouteAuthorizationGuard] },
{ path: 'update-task/:id', component: TaskUpdateComponent , canActivate: [RouteAuthorizationGuard] },
{ path: 'task-details/:id', component: TaskDetailsComponent , canActivate: [RouteAuthorizationGuard] },
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent, canActivate: [RouteAuthorizationGuard] },
{ path: 'user', component: UserComponent, canActivate: [RouteAuthorizationGuard] },
{ path: 'settings', component: SettingsComponent, canActivate: [RouteAuthorizationGuard] },
{ path: '', redirectTo: 'user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
