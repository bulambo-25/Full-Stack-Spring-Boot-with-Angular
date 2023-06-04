import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUserUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) {}
  //    return arraylist of employe
  public getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUserUrl}/dream-hotel/user/all`);
  }

  public addUser(users: User): Observable<User> {
    return this.http.post<User>(
      `${this.apiUserUrl}/dream-hotel/user/add`,
      users
    );
  }
  public updateUser(users: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiUserUrl}/dream-hotel/user/update`,
      users
    );
  }
  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUserUrl}/dream-hotel/user/delete/${id}`
    );
  }
}
