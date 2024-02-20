import {
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges
} from '@angular/core';
import { Task } from '../model/task';
import { Router } from '@angular/router';
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
import { MatTableDataSource } from '@angular/material/table';
import { MainTasklyService } from 'src/app/services/main-taskly.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  displayedColumns: string[] = ['name', 'category', 'priority', 'status'];
  @Input() tasks: Task[];
  finTaskModel: Task = new Task();
  dataSource: MatTableDataSource<Task>;

  nameIcon = faSignature;
  priorityIcon = faExclamation;
  stateIcon = faBullseye;
  startDateIcon = faCalendar;
  endDateIcon = faCalendarCheck;
  categoryIcon = faScroll;
  noteIcon = faClipboard;
  plusIcon = faPlus;

  constructor(
    private mainTasklyService: MainTasklyService,
    private router: Router,
    private ctf: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.tasks);
    console.log(this.tasks);
    this.ctf.detectChanges();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tasks);
    this.ctf.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks'] && changes['tasks'].currentValue) {
      this.dataSource = new MatTableDataSource(this.tasks);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDateTime(date: string) {
    return this.mainTasklyService.formatDate(date);
  }

  createTask() {
    this.router.navigate(['create-task']);
  }

  updateTask(id: number) {
    this.router.navigate(['update-task', id]);
  }

  deleteTask(id: number) {
    this.mainTasklyService.deleteTask(id).subscribe((data) => {
      console.log(data);
    });
  }

  taskDetails(id: number) {
    this.router.navigate(['task-details', id]);
  }

  finishTask(id: number) {
    this.finTaskModel.status.name = 'Finished';
    this.mainTasklyService
      .partlyChangeTask(id, this.finTaskModel)
      .subscribe((data) => {
        this.router.navigate(['/tasks']);
      });
  }
}
