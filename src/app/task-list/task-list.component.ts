import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { Router } from '@angular/router';
import {
  faSignature, faExclamation, faBullseye, faCalendar, faCalendarCheck,
  faScroll, faClipboard, faPlus
} from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table'
import { TokenService } from 'src/app/services/token.service';
import { concatMap } from 'rxjs/operators';
import { UserProperties } from '../model/user-properties';
import { MainTasklyService } from 'src/app/services/main-taskly.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  
  displayedColumns: string[] = ['name', 'category', 'priority', 'status'];
  tasks: Task[];
  finTaskModel: Task = new Task();
  dataSource: MatTableDataSource<Task>;
  userId: number;
  username: string;
  role: string;
  userProperties: UserProperties = new UserProperties();

  nameIcon = faSignature;
  priorityIcon = faExclamation;
  stateIcon = faBullseye;
  startDateIcon = faCalendar;
  endDateIcon = faCalendarCheck;
  categoryIcon = faScroll;
  noteIcon = faClipboard;
  plusIcon = faPlus;

  constructor(private mainTasklyService: MainTasklyService,
    private router: Router, private tokenService: TokenService) {
      let token = this.tokenService.getToken();
      if (token === null) {
        this.mainTasklyService.decodeToken(this.tokenService.getToken()).pipe(
          concatMap((tokenData: UserProperties) => {
            this.userProperties = tokenData;
            this.userId = this.userProperties.id;
            this.username = this.userProperties.username;
            this.role = this.userProperties.role;
            return this.mainTasklyService.getUserTask(this.userId);
          })
        ).subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          console.log(this.dataSource);
        });
      } else {
        this.router.navigate(['/login']);
      }
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDateTime(date: string) {
    return this.mainTasklyService.showDateTime(date);
  }

  private getTasks() {
    this.mainTasklyService.getTaskList().subscribe(data => {
      this.tasks = data;
    });
  }

  createTask() {
    this.router.navigate(['create-task']);
  }

  updateTask(id: number) {
    this.router.navigate(['update-task', id]);
  }

  deleteTask(id: number) {
    this.mainTasklyService.deleteTask(id).subscribe(data => {
      this.getTasks();
    });
  }

  taskDetails(id: number) {
    this.router.navigate(['task-details', id]);
  }

  finishTask(id: number) {
    this.finTaskModel.state = "Finished";
    this.mainTasklyService.partlyChangeTask(id, this.finTaskModel).subscribe(data => {
      this.router.navigate(['/tasks']);
    });
  }
}
