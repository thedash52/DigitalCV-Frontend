import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AchievementModel } from '../shared/models/achievementModel';
import { InterestHobbiesModel } from '../shared/models/interestHobbiesModel';
import { UploadFileModel } from '../shared/models/uploadFileModel';
import { PhoneNumberModel } from '../shared/models/phoneNumberModel';
import { EducationModel } from '../shared/models/educationModel';
import { CoursePaperModel } from '../shared/models/coursePaperModel';

@Injectable()
export class EditService {

  constructor() { 
    var coursePapers: CoursePaperModel[] = [];
      coursePapers.push({ code: "D111", name: "Test Paper", details: "Test Paper", grade: "A+" });
      coursePapers.push({ code: "D111", name: "Test Paper", details: "Test Paper", grade: "A+" });
      coursePapers.push({ code: "D111", name: "Test Paper", details: "Test Paper", grade: "A+" });
      coursePapers.push({ code: "D111", name: "Test Paper", details: "Test Paper", grade: "A+" });

      this.addEducationRecord({ img: "http://placehold.it/60x60", course: "Test Course 1", school: "Test School", src: "http://www.ucol.ac.nz/", year: 2016, papers: coursePapers });
      this.addEducationRecord({ img: "http://placehold.it/60x60", course: "Test Course 2", school: "Test School", src: "http://www.ucol.ac.nz/", year: 2016, papers: coursePapers });
      this.addEducationRecord({ img: "http://placehold.it/60x60", course: "Test Course 3", school: "Test School", src: "http://www.ucol.ac.nz/", year: 2015, papers: coursePapers });
      this.addEducationRecord({ img: "http://placehold.it/60x60", course: "Test Course 4", school: "Test School", src: "http://www.ucol.ac.nz/", year: 2016, papers: coursePapers });
   }

  inUse: Boolean = false;
  // Basic Page Data
  phoneNum: BehaviorSubject<PhoneNumberModel[]> = new BehaviorSubject([]);

  name: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;

  summary: string;

  getPhoneNumbers() {
    return this.phoneNum.asObservable();
  }

  addPhoneNumber(newPhoneNum: PhoneNumberModel) {
    let newList: PhoneNumberModel[] = this.phoneNum.getValue();
    newList.push(newPhoneNum);

    this.phoneNum.next(newList);
  }

  //Education Page Data
  educationList: BehaviorSubject<EducationModel[]> = new BehaviorSubject([]);

  getEducationList() {
    return this.educationList.asObservable();
  }

  addEducationRecord(course: EducationModel) {
    let newList: EducationModel[] = this.educationList.getValue();

    newList.push(course);

    this.educationList.next(newList);
  }

  editEducationRecord(row: number, course: EducationModel) {
    let newList: EducationModel[] = this.educationList.getValue();

    newList.splice(row, 1, course);

    this.educationList.next(newList);
  }

  deleteEducationRecord(course: EducationModel) {
    let newList: EducationModel[] = this.educationList.getValue();
    let row = newList.indexOf(course);

    newList.splice(row, 1);

    this.educationList.next(newList);
  }

  // Other Page Data
  achievements: BehaviorSubject<AchievementModel[]> = new BehaviorSubject([]);

  interestHobbies: BehaviorSubject<InterestHobbiesModel[]> = new BehaviorSubject([]);

  showReferees: Boolean;

  uploadedFiles: BehaviorSubject<UploadFileModel[]> = new BehaviorSubject([]);

  getAchievements() {
    return this.achievements.asObservable();
  }

  getInterestsHobbies() {
    return this.interestHobbies.asObservable();
  }

  getUploadedFiles() {
    return this.uploadedFiles.asObservable();
  }

  addAchievement(newAchievement: AchievementModel) {
    let newList: AchievementModel[] = this.achievements.getValue();
    newList.push(newAchievement);

    this.achievements.next(newList);
  }

  addInterestsHobbies(newInterestHobby: InterestHobbiesModel) {
    let newList: InterestHobbiesModel[] = this.interestHobbies.getValue();
    newList.push(newInterestHobby);

    this.interestHobbies.next(newList);
  }

  addUploadedFiles(newFile: UploadFileModel) {
    let newList: UploadFileModel[] = this.uploadedFiles.getValue();
    newList.push(newFile);

    this.uploadedFiles.next(newList);
  }

}
