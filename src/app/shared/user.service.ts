import { throwError as observableThrowError,  Observable } from 'rxjs';
import { timeout, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';

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
import { ResponseModel } from './models/httpModels/responseModel';

@Injectable()
export class UserService {

  constructor(private router: Router, private http: HttpClient) { }

  private url: string = environment.backendUrl;

  loginRoute: string;

  private createHeader(headers: HttpHeaders, authentication: boolean) {
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
    const headers = new HttpHeaders();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'auth/login', { username: username, password: password }, { headers }).toPromise()
    .then((res: Response) => res.json())
    .catch(this.handleError);
  }

  checkLogin() {
    const headers = new HttpHeaders();
    this.createHeader(headers, true);
    return this.http.get(this.url + 'auth/check-login', { headers: headers });
  }

  checkConnection(): Promise<ConnectionCheck> {
    return this.http.get<ConnectionCheck>(this.url + 'test/check-connection').pipe(timeout(30000), catchError(this.handleTimeout)).toPromise()
    .catch(this.handleError);
  }

  checkStorageAuth(): Promise<string> {
    return this.http.get<string>(this.url + 'test/test-storage', { responseType: 'text' as 'json'}).toPromise()
    .catch(this.handleError);
  }

  getType(): Observable<ReceiveTypeModel[]> {
    return this.http.get<ReceiveTypeModel[]>(this.url + 'get/type');
  }

  getBasic(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.url + 'get/basic');
  }

  getSkills(id: number): Observable<ResponseModel> {
    const headers = new HttpHeaders({
        'basicid': id.toString()
    });
    return this.http.get<ResponseModel>(this.url + 'get/skills', { headers: headers });
  }

  getTech(id: number): Observable<ResponseModel> {
    const headers = new HttpHeaders({
        'basicid': id.toString()
    });
    return this.http.get<ResponseModel>(this.url + 'get/technology', { headers: headers });
  }

  getExperience(id: number): Observable<ResponseModel> {
    const headers = new HttpHeaders({
        'basicid': id.toString()
    });
    return this.http.get<ResponseModel>(this.url + 'get/experience', { headers: headers });
  }

  getEducation(id: number): Observable<ResponseModel> {
    const headers = new HttpHeaders({
        'basicid': id.toString()
    });
    return this.http.get<ResponseModel>(this.url + 'get/education', { headers: headers });
  }

  getOther(id: number): Observable<ResponseModel> {
    const headers = new HttpHeaders({
        'basicid': id.toString()
    });
    return this.http.get<ResponseModel>(this.url + 'get/other', { headers: headers });
  }

  verifyBasic(basic: ReceiveBasicModel): Promise<{ basic: boolean, phone: boolean, social: boolean }> {
    const headers = new HttpHeaders();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'verify/basic', { basic }, { headers: headers }).toPromise()
    .then((res: ResponseModel) => res.results)
    .catch(this.handleError);
  }

  verifySkill(skill: SkillModel[]): Promise<boolean> {
    const headers = new HttpHeaders();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'verify/skill', { skill }, { headers: headers }).toPromise()
    .then((res: ResponseModel) => res.results)
    .catch(this.handleError);
  }

  verifyTech(tech: ReceiveTechModel): Promise<{ technology: boolean, repository: boolean }> {
    const headers = new HttpHeaders();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'verify/tech', { tech }, { headers: headers }).toPromise()
    .then((res: ResponseModel) => res.results)
    .catch(this.handleError);
  }

  verifyExperience(experience: ExperienceModel[]): Promise<boolean> {
    const headers = new HttpHeaders();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'verify/experience', { experience }, { headers: headers }).toPromise()
    .then((res: ResponseModel) => res.results)
    .catch(this.handleError);
  }

  verifyEducation(education: ReceiveEducationModel): Promise<{ education: boolean, paper: boolean }> {
    const headers = new HttpHeaders();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'verify/education', { education }, { headers: headers }).toPromise()
    .then((res: ResponseModel) => res.results)
    .catch(this.handleError);
  }

  verifyOther(other: ReceiveOtherModel): Promise<{ achievement: boolean, interest: boolean }> {
    const headers = new HttpHeaders();
    this.createHeader(headers, false);
    return this.http.post(this.url + 'verify/other', { other }, { headers: headers }).toPromise()
    .then((res: ResponseModel) => res.results)
    .catch(this.handleError);
  }

  SaveEdit(edit: PostSaveModel): Promise<RevieveSaveModel> {
    const headers = new HttpHeaders();
    this.createHeader(headers, true);
    return this.http.post(this.url + 'save/edit', { edit }, { headers: headers }).toPromise()
    .then((res: ResponseModel) => res.results)
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
