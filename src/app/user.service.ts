import { isDevMode, Injectable } from '@angular/core';           // ng core
import { HttpClient } from '@angular/common/http';               // ng<->express client
import { User, Survey, SurveyInput } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri: String;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.uri = 'http://localhost:8080/api';   // For local testing
    } else {
      this.uri = '/api';      // Production/Deployment
    }
  }

  // TODO: Implement functions and write documentation in
  // https://qmethod.gitbook.io/project/documentation/user-api
  // See user.service.spec.ts for unit tests

  getAllUsers(survey_id: string): Observable<Object> {
    return this
              .http
              .get(`${this.uri}/${survey_id}/users`);
  }

  addUser(survey_id: string, registration_info: any): Observable<Object>  {
    return this
              .http
              .post(`${this.uri}/${survey_id}/addUser`, registration_info);
  }

  getUser(survey_id: string, user_id: string): Observable<Object>  {
    return this
              .http
              .get(`${this.uri}/${survey_id}/user/${user_id}`);
  }

  updateUser(survey_id: string, user: User): Observable<Object>  {
    return this
              .http
              .post(`${this.uri}/${survey_id}/user/${user._id}`, user);
  }

  deleteUser(survey_id: string, user_id: string): Observable<Object>  {
    return this
              .http
              .delete(`${this.uri}/${survey_id}/user/${user_id}`);
  }
}
