import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

import { ReceiveBasicModel } from "./models/httpModels/receiveBasicModel";
import { ConnectionCheck } from "./models/httpModels/connectionCheckModel";
import { SkillModel } from "./models/displayModels/skillModel";
import { ReceiveTechModel } from "./models/httpModels/receiveTechModel";
import { ExperienceModel } from "./models/displayModels/experienceModel";
import { ReceiveEducationModel } from "./models/httpModels/receiveEducationModel";
import { ReceiveOtherModel } from "./models/httpModels/receiveOtherModel";
import { ReceiveTypeModel } from "./models/httpModels/typeModel";
import { RevieveSaveModel } from "./models/httpModels/recieveSaveModel";
import { PostSaveModel } from "./models/httpModels/postSaveModel";

@Injectable()
export class UserService {

  constructor(private router: Router, private http: Http) { }

  private url: string = environment.backendUrl;

  loginRoute: string;

  private createHeader(headers: Headers, authentication: boolean) {
    headers.append('Content-Type', 'application/json');

    if (authentication) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));

      if (currentUser) {
        headers.append('Authorization', 'JWT ' + currentUser);
      } else {
        headers.append('Authorization', "");
      }
    }
  }

  login(username: string, password: string) {
    let headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + "login", { username: username, password: password }, { headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  checkLogin() {
    let headers = new Headers();
    this.createHeader(headers, true);
    return this.http.get(this.url + "check-login", { headers: headers }).map((res: Response) => res.json());
  }

  checkConnection(): Observable<ConnectionCheck> {
    return this.http.get(this.url + "check-connection").map((res: Response) => res.json());
  }

  getType(): Observable<ReceiveTypeModel[]> {
    return this.http.get(this.url + "get-type").map((res: Response) => res.json());
  }

  getBasic(): Observable<ReceiveBasicModel> {
    return this.http.get(this.url + "get-basic").map((res: Response) => res.json());
  }

  getSkills(id: number): Observable<SkillModel[]> {
    let headers = new Headers();
    headers.append('basicId', id.toString());
    return this.http.get(this.url + "get-skills", { headers: headers }).map((res: Response) => res.json());
  }

  getTech(id: number): Observable<ReceiveTechModel> {
    let headers = new Headers();
    headers.append('basicId', id.toString());
    return this.http.get(this.url + "get-technology", { headers: headers }).map((res: Response) => res.json());
  }

  getExperience(id: number): Observable<ExperienceModel[]> {
    let headers = new Headers();
    headers.append('basicId', id.toString());
    return this.http.get(this.url + "get-experience", { headers: headers }).map((res: Response) => res.json());
  }

  getEducation(id: number): Observable<ReceiveEducationModel> {
    let headers = new Headers();
    headers.append('basicId', id.toString());
    return this.http.get(this.url + "get-education", { headers: headers }).map((res: Response) => res.json());
  }

  getOther(id: number): Observable<ReceiveOtherModel> {
    let headers = new Headers();
    headers.append('basicId', id.toString());
    return this.http.get(this.url + "get-other", { headers: headers }).map((res: Response) => res.json());
  }

  verifyBasic(basic: ReceiveBasicModel): Promise<{ basic: boolean, phone: boolean, social: boolean }> {
    let headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + "verify-basic", { basic }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  verifySkill(skill: SkillModel[]): Promise<boolean> {
    let headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + "verify-skill", { skill }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  verifyTech(tech: ReceiveTechModel): Promise<{ technology: boolean, repository: boolean }> {
    let headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + "verify-tech", { tech }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  verifyExperience(experience: ExperienceModel[]): Promise<boolean> {
    let headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + "verify-experience", { experience }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  verifyEducation(education: ReceiveEducationModel): Promise<{ education: boolean, paper: boolean }> {
    let headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + "verify-education", { education }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  verifyOther(other: ReceiveOtherModel): Promise<{ achievement: boolean, interest: boolean }> {
    let headers = new Headers();
    this.createHeader(headers, false);
    return this.http.post(this.url + "verify-other", { other }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  SaveEdit(edit: PostSaveModel): Promise<RevieveSaveModel> {
    let headers = new Headers();
    this.createHeader(headers, true);
    return this.http.post(this.url + "save-edit", { edit }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  private handleError(err: Response | any) {
    console.log(err);

    let errMsg: string;

    if (err instanceof Response) {
      const body = err.json() || '';
      const error = body.error || JSON.stringify(body);
      errMsg = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMsg = err.message ? err.message : err.toString();
    }

    return Promise.reject(errMsg);
  }
}
