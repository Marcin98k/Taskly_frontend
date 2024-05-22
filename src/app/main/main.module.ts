import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin/admin.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { CoreModule } from '../core/core.module';
import { CreateTaskComponent } from './components/task/create-task/create-task.component';
import { ShowTaskComponent } from './components/task/show-task/show-task.component';

@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    SettingsComponent,
    HomeComponent,
    CreateTaskComponent,
    ShowTaskComponent
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
