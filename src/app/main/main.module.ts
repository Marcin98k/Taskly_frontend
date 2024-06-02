import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin/admin.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { CoreModule } from '../core/core.module';
import { ShowTaskComponent } from './components/task/show-task/show-task.component';
import { TaskDetailsComponent } from './components/task/task-details/task-details.component';
import { TaskFormComponent } from './components/task/task-form/task-form.component';
import { DeleteTaskDialogComponent } from './components/task/delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from './components/task/edit-task-dialog/edit-task-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    SettingsComponent,
    HomeComponent,
    ShowTaskComponent,
    TaskDetailsComponent,
    TaskFormComponent,
    DeleteTaskDialogComponent,
    EditTaskDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    CoreModule,
    SharedModule
  ],
  exports: [AdminComponent, UserComponent, SettingsComponent, HomeComponent]
})
export class MainModule {}
