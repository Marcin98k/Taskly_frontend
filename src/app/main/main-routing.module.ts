import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShowTaskComponent } from './components/task/show-task/show-task.component';
import { TaskDetailsComponent } from './components/task/task-details/task-details.component';
import { TaskFormComponent } from './components/task/task-form/task-form.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'task-form', component: TaskFormComponent },
  { path: 'show-tasks', component: ShowTaskComponent },
  { path: 'task-details/:id', component: TaskDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
