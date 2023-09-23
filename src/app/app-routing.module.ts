import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './settings/settings/settings.component';

const routes: Routes = [
{ path: 'tasks', component: TaskListComponent },
{ path: 'create-task', component: TaskCreateComponent },
{ path: 'update-task/:id', component: TaskUpdateComponent},
{ path: 'task-details/:id', component: TaskDetailsComponent},
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},
{ path: 'user', component: UserComponent},
{ path: 'settings', component: SettingsComponent},
{ path: '', redirectTo: 'user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
