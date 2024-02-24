import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin/admin.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskUpdateComponent } from './components/task-update/task-update.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    TaskCreateComponent,
    TaskUpdateComponent,
    TaskDetailsComponent,
    TaskListComponent,
    UserComponent,
    SettingsComponent,
    HomeComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [HomeComponent]
})
export class MainModule {}
