import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateTaskComponent } from './components/task/create-task/create-task.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'create-task', component: CreateTaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
