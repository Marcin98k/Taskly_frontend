import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { PostTask, Task } from 'src/app/main/model/task';
import { TaskOptionsResponse } from 'src/app/main/model/task-options';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = environment.apiUrl;
  private taskURL = this.url + '/task';
  private optionsURL = this.url + '/options';

  private statusOptionsURL = this.optionsURL + '/status';
  private priorityOptionsURL = this.optionsURL + '/priority';
  private categoryOptionsURL = this.optionsURL + '/category';
  private typeOptionsURL = this.optionsURL + '/type';
  private userTaskURL = this.taskURL + '/showUserTasks';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  private getHeaders() {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenService.getToken()
    );
  }

  addTask(task: PostTask): Observable<Task> {
    return this.httpClient.post<Task>(this.taskURL, task);
  }

  getUserTasks(): Observable<Task[]> {
    return this.httpClient
      .get<Task[]>(`${this.userTaskURL}/${this.tokenService.getUserId()}`, {
        headers: this.getHeaders()
      })
      .pipe(
        map((tasks) =>
          tasks.map((task) => {
            task.dateAdded = this.getDateBy(task.dateAdded);
            task.taskDate = this.getDateBy(task.taskDate);
            return task;
          })
        )
      );
  }

  getTask(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.taskURL}/${id}`, {
      headers: this.getHeaders()
    });
  }

  patchTask(id: number, task: PostTask): Observable<object> {
    return this.httpClient.patch(`${this.taskURL}/${id}`, task, {
      headers: this.getHeaders()
    });
  }

  deleteTask(id: number): Observable<object> {
    return this.httpClient.delete(`${this.taskURL}/${id}`, {
      headers: this.getHeaders()
    });
  }

  getStatusOptions(): Observable<TaskOptionsResponse[]> {
    return this.httpClient.get<TaskOptionsResponse[]>(
      `${this.statusOptionsURL}`
    );
  }

  getPriorityOptions(): Observable<TaskOptionsResponse[]> {
    return this.httpClient.get<TaskOptionsResponse[]>(
      `${this.priorityOptionsURL}`
    );
  }

  getCategoryOptions(): Observable<TaskOptionsResponse[]> {
    return this.httpClient.get<TaskOptionsResponse[]>(
      `${this.categoryOptionsURL}`
    );
  }

  getTypeOptions(): Observable<TaskOptionsResponse[]> {
    return this.httpClient.get<TaskOptionsResponse[]>(`${this.typeOptionsURL}`);
  }

  formatDateToString(date: string): string {
    const newDate = new Date(new Date(date).setSeconds(0));
    const formattedDate = moment(newDate).format('YYYY-MM-DDTHH:mm:ss');
    return formattedDate;
  }

  formatDateAndHourToString(date: string, time: string): string {
    const newDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    newDate.setHours(hours, minutes, 0);
    const formattedDate = moment(newDate).format('YYYY-MM-DDTHH:mm:ss');
    return formattedDate;
  }

  getDateBy(date: string) {
    return moment(date).format('YYYY-MM-DD HH:mm');
  }
}
