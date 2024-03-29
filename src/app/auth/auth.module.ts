import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoreModule } from '../core/core.module';
import { MainModule } from '../main/main.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    MainModule,
    SharedModule
  ],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
