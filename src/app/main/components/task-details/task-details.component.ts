import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../model/task';
import {
  faSignature,
  faExclamation,
  faBullseye,
  faCalendar,
  faCalendarCheck,
  faScroll,
  faClipboard,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { MainTasklyService } from 'src/app/core/services/main-taskly.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  finTaskModel: Task = new Task();

  nameIcon = faSignature;
  priorityIcon = faExclamation;
  stateIcon = faBullseye;
  startDateIcon = faCalendar;
  endDateIcon = faCalendarCheck;
  categoryIcon = faScroll;
  noteIcon = faClipboard;
  plusIcon = faPlus;

  id: number;
  task: Task;
  userId: number;

  constructor(
    private route: ActivatedRoute,
    private mainTasklyService: MainTasklyService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.id = this.route.snapshot.params['id'];

  //   this.task = new Task();
  //   this.mainTasklyService.getTaskById(this.id).subscribe((data) => {
  //     this.task = data;
  //     this.task.dateAdded = this.showDateTime(data.dateAdded);
  //     this.task.taskDate = this.showDateTime(data.taskDate);
  //   });
  // }

  showDateTime(date: string) {
    return this.mainTasklyService.getDateBy(date);
  }

  updateTask(id: number) {
    this.router.navigate(['update-task', id]);
  }

  deleteTask(id: number) {
    this.mainTasklyService.deleteTask(id).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }

  finishTask(id: number) {
    this.finTaskModel.status.name = 'FINISHED';
    this.mainTasklyService
      .partlyChangeTask(id, this.finTaskModel)
      .subscribe(() => {
        this.router.navigate(['/tasks']);
      });
  }
}
