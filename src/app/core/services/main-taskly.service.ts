import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskResponse } from '../../main/model/task';
import * as moment from 'moment';
import { TokenService } from './token.service';
import { TaskOptionsResponse } from '../../main/model/task-options';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MainTasklyService {
  private url = environment.apiUrl;

  private taskURL = this.url + '/task';

  private userTaskURL = this.taskURL + '/showUserTasks';
  private completeTasksURL = this.taskURL + '/showAllCompletedTasks';
  private currentTaskURL = this.taskURL + '/showCurrentTasks';
  private taskByCategoryURL = this.taskURL + '/showTaskByCategory';
  private countAllTasksURL = this.taskURL + '/countAllTask';
  private countActiveTasksURL = this.taskURL + '/countActiveTask';
  private countCompletedTasksURL = this.taskURL + '/countCompletedTask';

  private optionURL = this.url + '/options';

  private statusURL = this.optionURL + '/status';
  private priorityURL = this.optionURL + '/priority';
  private categoryURL = this.optionURL + '/category';
  private typeURL = this.optionURL + '/type';

  private getHeaders() {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenService.getToken()
    );
  }

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  getTaskList(): Observable<TaskResponse[]> {
    return this.httpClient.get<TaskResponse[]>(`${this.taskURL}`, {
      headers: this.getHeaders()
    });
  }

  getUserTask(userId: number): Observable<TaskResponse[]> {
    return this.httpClient.get<TaskResponse[]>(
      `${this.userTaskURL}/${userId}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  getTaskById(id: number): Observable<TaskResponse> {
    return this.httpClient.get<TaskResponse>(`${this.taskURL}/${id}`, {
      headers: this.getHeaders()
    });
  }

  getCompletedTask(userId: number) {
    return this.httpClient.get<TaskResponse[]>(
      `${this.completeTasksURL}/${userId}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  getCurrentTask(userId: number) {
    return this.httpClient.get<TaskResponse[]>(
      `${this.currentTaskURL}/${userId}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  // getTaskByCategory(userId: number, category: string) {
  //   return this.httpClient.post<Task[]>(`${this.taskByCategory}/${userId}`, {category: category}, {headers:this.getHeaders()});
  // }

  // Count
  getAllTaskCount(userId: number) {
    return this.httpClient.get<number>(`${this.countAllTasksURL}/${userId}`, {
      headers: this.getHeaders()
    });
  }

  getCompletedTaskCount(userId: number) {
    return this.httpClient.get<number>(
      `${this.countCompletedTasksURL}/${userId}`,
      { headers: this.getHeaders() }
    );
  }

  getActiveTaskCount(userId: number) {
    return this.httpClient.get<number>(
      `${this.countActiveTasksURL}/${userId}`,
      { headers: this.getHeaders() }
    );
  }

  getStatusListAny(): Observable<unknown> {
    return this.httpClient.get<unknown>(`${this.statusURL}`, {
      headers: this.getHeaders()
    });
  }
  getStatusList(): Observable<TaskOptionsResponse[]> {
    return this.httpClient.get<TaskOptionsResponse[]>(`${this.statusURL}`, {
      headers: this.getHeaders()
    });
  }

  getPriorityList(): Observable<TaskOptionsResponse[]> {
    return this.httpClient.get<TaskOptionsResponse[]>(`${this.priorityURL}`, {
      headers: this.getHeaders()
    });
  }

  getCategoryList(): Observable<TaskOptionsResponse[]> {
    return this.httpClient.get<TaskOptionsResponse[]>(`${this.categoryURL}`, {
      headers: this.getHeaders()
    });
  }

  getTypeList(): Observable<TaskOptionsResponse[]> {
    return this.httpClient.get<TaskOptionsResponse[]>(`${this.typeURL}`, {
      headers: this.getHeaders()
    });
  }

  saveTask(task: TaskResponse): Observable<object> {
    return this.httpClient.post(`${this.taskURL}`, task, {
      headers: this.getHeaders()
    });
  }

  updateTask(id: number, task: TaskResponse): Observable<object> {
    return this.httpClient.put(`${this.taskURL}/${id}`, task, {
      headers: this.getHeaders()
    });
  }

  deleteTask(id: number): Observable<object> {
    return this.httpClient.delete(`${this.taskURL}/${id}`, {
      headers: this.getHeaders()
    });
  }

  partlyChangeTask(id: number, task: unknown): Observable<object> {
    return this.httpClient.patch(`${this.taskURL}/${id}`, task, {
      headers: this.getHeaders()
    });
  }

  formatDate(date: string) {
    const newDate = new Date(new Date(date).setSeconds(0));
    const formattedDate = moment(newDate).format('YYYY-MM-DDTHH:mm:ss');
    return formattedDate;
  }

  getDateBy(date: string) {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    return formattedDate;
  }

  getHour(date: string) {
    const formattedDate = moment(date).format('HH:mm:ss');
    return formattedDate;
  }
}
