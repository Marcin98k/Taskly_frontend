import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostTask, Task, TaskResponse } from 'src/app/main/model/task';
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
    //   return this.httpClient.post<TaskResponse>(this.taskURL, task, {
    //     headers: this.getHeaders()
    //   });
    //   // .pipe(
    //   //   map(
    //   //     ({
    //   //       id,
    //   //       userId,
    //   //       name,
    //   //       dateAdded,
    //   //       taskDate,
    //   //       status,
    //   //       priority,
    //   //       category,
    //   //       type,
    //   //       note
    //   //     }) =>
    //   //       new Task(
    //   //         id,
    //   //         userId,
    //   //         name,
    //   //         dateAdded,
    //   //         taskDate,
    //   //         status,
    //   //         priority,
    //   //         category,
    //   //         type,
    //   //         note
    //   //       )
    //   //   )
    //   // );
  }

  getUserTask(userId: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.userTaskURL}/${userId}`, {
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

  formatDate(date: string) {
    const newDate = new Date(new Date(date).setSeconds(0));
    const formattedDate = moment(newDate).format('YYYY-MM-DDTHH:mm:ss');
    return formattedDate;
  }
}
