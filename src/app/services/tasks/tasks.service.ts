import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl = "https://app.microenv.com/backend/key/9345e6be13a70f45496181/rest/api/tasks/"

  constructor(private http: HttpClient) { }

  public getTasks() : Observable<any> {
    return this.http.get(this.getUrl())
      .pipe(map((response: Response) => response));
  }

  private getUrl() {
    return `${this.baseUrl}`;
  }
}
