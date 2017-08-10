import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ReceiveBasicModel } from "./models/httpModels/receiveBasicModel";
import { ConnectionCheck } from "./models/httpModels/connectionCheckModel";
import { SkillModel } from "./models/displayModels/skillModel";
import { ReceiveTechModel } from "./models/httpModels/receiveTechModel";
import { ExperienceModel } from "./models/displayModels/experienceModel";
import { ReceiveEducationModel } from "./models/httpModels/receiveEducationModel";
import { ReceiveOtherModel } from "./models/httpModels/receiveOtherModel";

@Injectable()
export class UserService {

  constructor(private router: Router, private http: Http) { }

  private url: string = "http://localhost:3000/";

  private createHeader(headers: Headers) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' + currentUser.token);
  }

  checkLogin() {
    let headers = new Headers();
    this.createHeader(headers);
    return this.http.get(this.url + "check-login", { headers: headers }).map((res: Response) => res.json());
  }

  checkConnection(): Observable<ConnectionCheck> {
    return this.http.get(this.url + "check-connection").map((res: Response) => res.json());
  }

  getBasic(): Observable<ReceiveBasicModel> {
    return this.http.get(this.url + "get-basic").map((res: Response) => res.json());
  }

  getSkills(): Observable<SkillModel[]> {
    return this.http.get(this.url + "get-skills").map((res: Response) => res.json());
  }

  getTech(): Observable<ReceiveTechModel> {
    return this.http.get(this.url + "get-technology").map((res: Response) => res.json());
  }

  getExperience(): Observable<ExperienceModel[]> {
    return this.http.get(this.url + "get-experience").map((res: Response) => res.json());
  }

  getEducation(): Observable<ReceiveEducationModel> {
    return this.http.get(this.url + "get-education").map((res: Response) => res.json());
  }

  getOther(): Observable<ReceiveOtherModel> {
    return this.http.get(this.url + "get-other").map((res: Response) => res.json());
  }

  verifyBasic(basic: ReceiveBasicModel): Promise<{ basic: boolean, phone: boolean, social: boolean }> {
    let headers = new Headers();
    this.createHeader(headers);
    return this.http.post(this.url + "verify-basic", { basic }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  verifySkill(skill: SkillModel[]): Promise<boolean> {
    let headers = new Headers();
    this.createHeader(headers);
    return this.http.post(this.url + "verify-skill", { skill }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  verifyTech(tech: ReceiveTechModel): Promise<{ technology: boolean, repository: boolean }> {
    let headers = new Headers();
    this.createHeader(headers);
    return this.http.post(this.url + "verify-tech", { tech }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  verifyExperience(experience: ExperienceModel[]): Promise<boolean> {
    let headers = new Headers();
    this.createHeader(headers);
    return this.http.post(this.url + "verify-experience", { experience }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  verifyEducation(education: ReceiveEducationModel): Promise<{ education: boolean, paper: boolean }> {
    let headers = new Headers();
    this.createHeader(headers);
    return this.http.post(this.url + "verify-education", { education }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
  }

  verifyOther(other: ReceiveOtherModel): Promise<{ achievement: boolean, interest: boolean }> {
    let headers = new Headers();
    this.createHeader(headers);
    return this.http.post(this.url + "verify-other", { other }, { headers: headers }).toPromise().then((res: Response) => res.json()).catch(this.handleError);
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
