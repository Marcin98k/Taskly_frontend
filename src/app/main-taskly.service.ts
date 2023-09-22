import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './model/task';
import * as moment from 'moment';
import { User } from './model/user';
import { UserProperties } from './model/user-properties';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class MainTasklyService {
  private baseURL = "http://localhost:8080/api/v1/showAllTasks";
  private userTaskURL = "http://localhost:8080/api/v1/showUserTasks";

  private stateURL = "http://localhost:8080/enum/task-state";
  private priorityURL = "http://localhost:8080/enum/task-priority";
  private categoryURL = "http://localhost:8080/enum/task-categories";
  // private periodURL = "http://localhost:8080/enum/task-period";
  private typeURL = "http://localhost:8080/enum/task-type";
  
  private loginURL = "http://localhost:8080/auth/login";
  private registerURL = "http://localhost:8080/auth/register";
  private tokenURL = "http://localhost:8080/auth/token";

  private adminUrl = '';
  private userUrl = '';
  private showUser = '';

  private getHeaders() {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
  }

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getTaskList(): Observable<Task[]>{
    return this.httpClient.get<Task[]>(`${this.baseURL}`, {headers: this.getHeaders()});
  }

  getUserTask(userId: number): Observable<Task[]>{
    return this.httpClient.get<Task[]>(`${this.userTaskURL}/${userId}`, {headers: this.getHeaders()})
  }

  getStatesList(): Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.stateURL}`, {headers: this.getHeaders()});
  }

  getTaskPrioritiesList(): Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.priorityURL}`, {headers: this.getHeaders()});
  }

  getTaskCategoriesList(): Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.categoryURL}`, {headers: this.getHeaders()});
  }

  getTaskTypeList(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.typeURL}`, {headers: this.getHeaders()});
  }
  
  saveTask(task: Task): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, task);
  }

  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.baseURL}/${id}`, {headers: this.getHeaders()});
  }

  updateTask(id: number, task: Task): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, task);
  }

  deleteTask(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  partlyChangeTask(id: number, task: any): Observable<Object>{
    return this.httpClient.patch(`${this.baseURL}/${id}`, task);
  }

  signInUser(user: User): Observable<string>{
    return this.httpClient.post(`${this.loginURL}`, user, { responseType: 'text' });
  }

  signUpUser(user: User) {
    return this.httpClient.post(`${this.registerURL}`, user);
  }

  decodeToken(token: string | null): Observable<UserProperties> {
    return this.httpClient.post<UserProperties>(`${this.tokenURL}/${token}`, null);
  }

  formatDate(date: string) {
    const newDate = new Date(new Date(date).setSeconds(0));
    const formattedDate = moment(newDate).format("YYYY-MM-DD HH:mm:ss");
    return formattedDate;
  }

  showDateTime(date: string) {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return formattedDate;
  }
  
  showTime(date: string) {
    const formattedDate = moment(date).format("HH:mm:ss");
    return formattedDate;
  }
}
