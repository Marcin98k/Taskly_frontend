import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import * as moment from 'moment';
import { User } from '../model/user';
import { UserProperties } from '../model/user-properties';
import { TokenService } from './token.service';
import { TaskOptions } from '../model/task-options';

@Injectable({
  providedIn: 'root'
})
export class MainTasklyService {
  private baseURL = 'http://localhost:8080/task';
  private userTaskURL = 'http://localhost:8080/task/showUserTasks';
  private completeTasksURL = 'http://localhost:8080/task/showAllCompletedTasks';
  private currentTaskURL = 'http://localhost:8080/task/showCurrentTasks';
  private taskByCategory = 'http://localhost:8080/task/showTaskByCategory';

  private countAllTasksURL = 'http://localhost:8080/task/countAllTask';
  private countActiveTasksURL = 'http://localhost:8080/task/countActiveTask';
  private countCompletedTasksURL =
    'http://localhost:8080/task/countCompletedTask';

  private statusURL = 'http://localhost:8080/options/status';
  private priorityURL = 'http://localhost:8080/options/priority';
  private categoryURL = 'http://localhost:8080/options/category';
  private typeURL = 'http://localhost:8080/options/type';

  private signInURL = 'http://localhost:8080/auth/login';
  private signUpURL = 'http://localhost:8080/auth/register';
  private tokenURL = 'http://localhost:8080/auth/token';
  private adminUrl = '';
  private userUrl = '';

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

  // Task
  getTaskList(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.baseURL}`, {
      headers: this.getHeaders()
    });
  }

  getUserTask(userId: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.userTaskURL}/${userId}`, {
      headers: this.getHeaders()
    });
  }

  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.baseURL}/${id}`, {
      headers: this.getHeaders()
    });
  }

  getCompletedTask(userId: number) {
    return this.httpClient.get<Task[]>(`${this.completeTasksURL}/${userId}`, {
      headers: this.getHeaders()
    });
  }

  getCurrentTask(userId: number) {
    return this.httpClient.get<Task[]>(`${this.currentTaskURL}/${userId}`, {
      headers: this.getHeaders()
    });
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

  getStatusList(): Observable<TaskOptions[]> {
    return this.httpClient.get<TaskOptions[]>(`${this.statusURL}`, {
      headers: this.getHeaders()
    });
  }

  getPriorityList(): Observable<TaskOptions[]> {
    return this.httpClient.get<TaskOptions[]>(`${this.priorityURL}`, {
      headers: this.getHeaders()
    });
  }

  getCategoryList(): Observable<TaskOptions[]> {
    return this.httpClient.get<TaskOptions[]>(`${this.categoryURL}`, {
      headers: this.getHeaders()
    });
  }

  getTypeList(): Observable<TaskOptions[]> {
    return this.httpClient.get<TaskOptions[]>(`${this.typeURL}`, {
      headers: this.getHeaders()
    });
  }

  // Activities on tasks
  saveTask(task: Task): Observable<object> {
    return this.httpClient.post(`${this.baseURL}`, task, {
      headers: this.getHeaders()
    });
  }

  updateTask(id: number, task: Task): Observable<object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, task, {
      headers: this.getHeaders()
    });
  }

  deleteTask(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`, {
      headers: this.getHeaders()
    });
  }

  partlyChangeTask(id: number, task: any): Observable<object> {
    return this.httpClient.patch(`${this.baseURL}/${id}`, task, {
      headers: this.getHeaders()
    });
  }

  // Account activities
  signInUser(user: User): Observable<string> {
    return this.httpClient.post(`${this.signInURL}`, user, {
      responseType: 'text'
    });
  }

  signUpUser(user: User) {
    return this.httpClient.post(`${this.signUpURL}`, user);
  }

  decodeToken(token: string | null): Observable<UserProperties> {
    return this.httpClient.post<UserProperties>(
      `${this.tokenURL}/${token}`,
      null,
      { headers: this.getHeaders() }
    );
  }

  // Internal methods
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
