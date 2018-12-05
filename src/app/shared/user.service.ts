
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, Response, Headers, RequestOptions } from '@angular/http';





import { environment } from '../../environments/environment';

import { ReceiveBasicModel } from './models/httpModels/receiveBasicModel';
import { ConnectionCheck } from './models/httpModels/connectionCheckModel';
import { SkillModel } from './models/displayModels/skillModel';
import { ReceiveTechModel } from './models/httpModels/receiveTechModel';
import { ExperienceModel } from './models/displayModels/experienceModel';
import { ReceiveEducationModel } from './models/httpModels/receiveEducationModel';
import { ReceiveOtherModel } from './models/httpModels/receiveOtherModel';
import { ReceiveTypeModel } from './models/httpModels/typeModel';
import { RevieveSaveModel } from './models/httpModels/recieveSaveModel';
import { PostSaveModel } from './models/httpModels/postSaveModel';

@Injectable()
export class UserService {

  constructor(private router: Router, private http: HttpClient) { }

  private url: string = environment.backendUrl;

  loginRoute: string;

  private createHeader(headers: Headers, authentication: boolean) {
    headers.append('Content-Type', 'application/json');

    if (authentication) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      if (currentUser) {
        headers.append('Authorization', 'JWT ' + currentUser);
      } else {
        headers.append('Authorization', '');
      }
    }
  }

  login(username: string, password: string) {
    const headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'login', { username: username, password: password }, { headers }).toPromise()
    .then((res: Response) => res.json())
    .catch(this.handleError);
  }

  checkLogin() {
    const headers = new Headers();
    this.createHeader(headers, true);
    return this.http.get(this.url + 'check-login', { headers: headers });
  }

  checkConnection(): Observable<ConnectionCheck> {
    return this.http.get(this.url + 'check-connection').timeout(30000).catch(this.handleTimeout);
  }

  getType(): Observable<ReceiveTypeModel[]> {
    return this.http.get(this.url + 'get-type');
  }

  getBasic(): Observable<ReceiveBasicModel> {
    return this.http.get(this.url + 'get-basic');
  }

  getSkills(id: number): Observable<SkillModel[]> {
    const headers = new Headers();
    headers.append('basicId', id.toString());
    return this.http.get(this.url + 'get-skills', { headers: headers });
  }

  getTech(id: number): Observable<ReceiveTechModel> {
    const headers = new Headers();
    headers.append('basicId', id.toString());
    return this.http.get(this.url + 'get-technology', { headers: headers });
  }

  getExperience(id: number): Observable<ExperienceModel[]> {
    const headers = new Headers();
    headers.append('basicId', id.toString());
    return this.http.get(this.url + 'get-experience', { headers: headers });
  }

  getEducation(id: number): Observable<ReceiveEducationModel> {
    const headers = new Headers();
    headers.append('basicId', id.toString());
    return this.http.get(this.url + 'get-education', { headers: headers });
  }

  getOther(id: number): Observable<ReceiveOtherModel> {
    const headers = new Headers();
    headers.append('basicId', id.toString());
    return this.http.get(this.url + 'get-other', { headers: headers });
  }

  verifyBasic(basic: ReceiveBasicModel): Promise<{ basic: boolean, phone: boolean, social: boolean }> {
    const headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'verify-basic', { basic }, { headers: headers }).toPromise()
    .then((res: Response) => res.json())
    .catch(this.handleError);
  }

  verifySkill(skill: SkillModel[]): Promise<boolean> {
    const headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'verify-skill', { skill }, { headers: headers }).toPromise()
    .then((res: Response) => res.json())
    .catch(this.handleError);
  }

  verifyTech(tech: ReceiveTechModel): Promise<{ technology: boolean, repository: boolean }> {
    const headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'verify-tech', { tech }, { headers: headers }).toPromise()
    .then((res: Response) => res.json())
    .catch(this.handleError);
  }

  verifyExperience(experience: ExperienceModel[]): Promise<boolean> {
    const headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'verify-experience', { experience }, { headers: headers }).toPromise()
    .then((res: Response) => res.json())
    .catch(this.handleError);
  }

  verifyEducation(education: ReceiveEducationModel): Promise<{ education: boolean, paper: boolean }> {
    const headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'verify-education', { education }, { headers: headers }).toPromise()
    .then((res: Response) => res.json())
    .catch(this.handleError);
  }

  verifyOther(other: ReceiveOtherModel): Promise<{ achievement: boolean, interest: boolean }> {
    const headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'verify-other', { other }, { headers: headers }).toPromise()
    .then((res: Response) => res.json())
    .catch(this.handleError);
  }

  SaveEdit(edit: PostSaveModel): Promise<RevieveSaveModel> {
    const headers = new Headers();
    this.createHeader(headers, true);
    return this.http.post(this.url + 'save-edit', { edit }, { headers: headers }).toPromise()
    .then((res: Response) => res.json())
    .catch(this.handleError);
  }

  private handleError(err: Response | any) {
    console.log(err);

    let errMsg: string;

    if (err instanceof Response) {
      const body = err.json() || '';
      const error = body.error || JSON.stringify(body);
      errMsg = `${err.status} - ${err.statusText || ''} ${error}`;
    } else if (err.name === 'TimeoutError') {
      errMsg = err.name;
    } else {
      errMsg = err.message ? err.message : err.toString();
    }

    return Promise.reject(errMsg);
  }

  private handleTimeout(err) {
    console.log(err);

    return observableThrowError(err);
  }
}
