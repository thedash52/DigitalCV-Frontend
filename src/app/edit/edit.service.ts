import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AchievementModel } from '../shared/models/achievementModel';
import { InterestHobbiesModel } from '../shared/models/interestHobbiesModel';
import { UploadFileModel } from '../shared/models/uploadFileModel';
import { PhoneNumberModel } from '../shared/models/phoneNumberModel';
import { EducationModel } from '../shared/models/educationModel';
import { CoursePaperModel } from '../shared/models/coursePaperModel';
import { ExperienceModel } from '../shared/models/experienceModel';
import { SkillModel } from "../shared/models/skillModel";
import { TechnologyModel } from "../shared/models/technologyModel";

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

    this.addExperience({ img: "http://placehold.it/60x60", title: "Test Title 1", location: "Palmerston North", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", startDate: "2000-06-15", endDate: "", current: true });
    this.addExperience({ img: "http://placehold.it/60x60", title: "Test Title 1", location: "Palmerston North", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", startDate: "2000-06-15", endDate: "2000-06-25", current: false });
    this.addExperience({ img: "http://placehold.it/60x60", title: "Test Title 1", location: "Palmerston North", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", startDate: "2000-06-15", endDate: "2000-06-25", current: false });
    this.addExperience({ img: "http://placehold.it/60x60", title: "Test Title 1", location: "Palmerston North", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", startDate: "2000-06-15", endDate: "2000-06-25", current: false });

    this.addSkill({ detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category One" });
    this.addSkill({ detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Two" });
    this.addSkill({ detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category One" });
    this.addSkill({ detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Three" });
    this.addSkill({ detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category One" });
    this.addSkill({ detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Two" });

    this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 1", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category One", src: "http://test.site.com" });
    this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 2", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Two", src: "http://test.site.com" });
    this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 3", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category One", src: "http://test.site.com" });
    this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 4", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Three", src: "http://test.site.com" });
    this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 5", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Three", src: "http://test.site.com" });
    this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 6", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Three", src: "http://test.site.com" });
    this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 7", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Four", src: "http://test.site.com" });
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

  //Skill Page Data
  skills: BehaviorSubject<SkillModel[]> = new BehaviorSubject([]);

  getSkills() {
    return this.skills.asObservable();
  }

  addSkill(skill: SkillModel) {
    let newList: SkillModel[] = this.skills.getValue();
    newList.push(skill);

    this.skills.next(newList);
  }

  editSkill(row: number, skill: SkillModel) {
    let newList: SkillModel[] = this.skills.getValue();
    newList.splice(row, 1, skill);

    this.skills.next(newList);
  }

  deleteSkill(skill: SkillModel) {
    let newList: SkillModel[] = this.skills.getValue();
    let row = newList.indexOf(skill);

    newList.splice(row, 1);

    this.skills.next(newList);
  }

  //Technology Page Data
  technologies: BehaviorSubject<TechnologyModel[]> = new BehaviorSubject([]);

  showRepositories: boolean;

  getTechnologies() {
    return this.technologies.asObservable();
  }

  addTechnology(technology: TechnologyModel) {
    let newList: TechnologyModel[] = this.technologies.getValue();
    newList.push(technology);

    this.technologies.next(newList);
  }

  editTechnology(row: number, technology: TechnologyModel) {
    let newList: TechnologyModel[] = this.technologies.getValue();
    newList.splice(row, 1, technology);

    this.technologies.next(newList);
  }

  deleteTechnology(technology: TechnologyModel) {
    let newList: TechnologyModel[] = this.technologies.getValue();
    let row = newList.indexOf(technology);

    newList.splice(row, 1);

    this.technologies.next(newList);
  }

  //Experience Page Data
  experienceList: BehaviorSubject<ExperienceModel[]> = new BehaviorSubject([]);

  getExperienceList() {
    return this.experienceList.asObservable();
  }

  addExperience(experience: ExperienceModel) {
    let newList: ExperienceModel[] = this.experienceList.getValue();
    newList.push(experience);

    this.experienceList.next(newList);
  }

  editExperience(row: number, experience: ExperienceModel) {
    let newList: ExperienceModel[] = this.experienceList.getValue();
    newList.splice(row, 1, experience);

    this.experienceList.next(newList);
  }

  deleteExperience(experience: ExperienceModel) {
    let newList: ExperienceModel[] = this.experienceList.getValue();
    let row = newList.indexOf(experience);

    newList.splice(row, 1);

    this.experienceList.next(newList);
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
