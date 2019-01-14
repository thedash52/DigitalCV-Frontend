import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AchievementModel } from '../shared/models/achievementModel';
import { InterestHobbiesModel } from '../shared/models/interestHobbiesModel';
import { UploadFileModel } from '../shared/models/uploadFileModel';
import { PhoneNumberModel } from '../shared/models/phoneNumberModel';
import { PhoneTypeModel } from '../shared/models/phoneTypeModel';
import { EducationModel } from '../shared/models/educationModel';
import { ExperienceModel } from '../shared/models/displayModels/experienceModel';
import { SkillModel } from "../shared/models/displayModels/skillModel";
import { TechnologyModel } from "../shared/models/technologyModel";
import { RepositoryOptionModel } from "../shared/models/repositoryOptionModel";
import { RepositoryModel } from "../shared/models/repositoryModel";
import { SocialModel } from "../shared/models/socialModel";
import { SocialTypeModel } from "../shared/models/socialTypeModel";

@Injectable()
export class EditService {

  constructor() {
    // var coursePapers: CoursePaperModel[] = [];
    // coursePapers.push({ code: "D111", name: "Test Paper", details: "Test Paper", grade: "A+" });
    // coursePapers.push({ code: "D111", name: "Test Paper", details: "Test Paper", grade: "A+" });
    // coursePapers.push({ code: "D111", name: "Test Paper", details: "Test Paper", grade: "A+" });
    // coursePapers.push({ code: "D111", name: "Test Paper", details: "Test Paper", grade: "A+" });

    // this.addEducationRecord({ img: "http://placehold.it/60x60", course: "Test Course 1", school: "Test School", src: "http://www.ucol.ac.nz/", year: 2016, papers: coursePapers });
    // this.addEducationRecord({ img: "http://placehold.it/60x60", course: "Test Course 2", school: "Test School", src: "http://www.ucol.ac.nz/", year: 2016, papers: coursePapers });
    // this.addEducationRecord({ img: "http://placehold.it/60x60", course: "Test Course 3", school: "Test School", src: "http://www.ucol.ac.nz/", year: 2015, papers: coursePapers });
    // this.addEducationRecord({ img: "http://placehold.it/60x60", course: "Test Course 4", school: "Test School", src: "http://www.ucol.ac.nz/", year: 2016, papers: coursePapers });

    // this.addExperience({ img: "http://placehold.it/60x60", title: "Test Title 1", location: "Palmerston North", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", startDate: "2000-06-15", endDate: "", current: true });
    // this.addExperience({ img: "http://placehold.it/60x60", title: "Test Title 1", location: "Palmerston North", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", startDate: "2000-06-15", endDate: "2000-06-25", current: false });
    // this.addExperience({ img: "http://placehold.it/60x60", title: "Test Title 1", location: "Palmerston North", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", startDate: "2000-06-15", endDate: "2000-06-25", current: false });
    // this.addExperience({ img: "http://placehold.it/60x60", title: "Test Title 1", location: "Palmerston North", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", startDate: "2000-06-15", endDate: "2000-06-25", current: false });

    // this.addSkill({ detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category One" });
    // this.addSkill({ detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Two" });
    // this.addSkill({ detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category One" });
    // this.addSkill({ detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Three" });
    // this.addSkill({ detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category One" });
    // this.addSkill({ detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Two" });

    // this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 1", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category One", src: "http://test.site.com" });
    // this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 2", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Two", src: "http://test.site.com" });
    // this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 3", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category One", src: "http://test.site.com" });
    // this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 4", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Three", src: "http://test.site.com" });
    // this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 5", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Three", src: "http://test.site.com" });
    // this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 6", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Three", src: "http://test.site.com" });
    // this.addTechnology({ img: "http://placehold.it/60x60", name: "Test 7", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet, mi quis feugiat iaculis, nibh mauris euismod quam, sit amet euismod mi risus at felis. Donec dictum, neque et pretium rhoncus, velit sem fringilla nulla, ut rutrum felis lectus ac felis. Duis et orci risus. Mauris eget turpis pretium, semper lorem eu, mollis orci. Quisque lobortis non elit et fermentum. Ut sollicitudin ullamcorper ligula id vulputate. In hac habitasse platea dictumst. Sed eget auctor nisi. In dolor dolor, tincidunt eu neque ac, suscipit rutrum dui. Phasellus pharetra tempus porta. Vivamus sed justo varius, aliquet justo et, porttitor lorem. In id feugiat felis. Nulla facilisi.", category: "Category Four", src: "http://test.site.com" });
  }

  setUp: boolean = false;

  // Basic Page Data
  phoneNum: BehaviorSubject<PhoneNumberModel[]> = new BehaviorSubject([]);
  phoneTypes: BehaviorSubject<PhoneTypeModel[]> = new BehaviorSubject([]);

  id: number;
  folderId: string;
  avatarImg: string;
  profileImg: string;
  avatar: string;
  profile: string;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;

  summary: string;

  social: BehaviorSubject<SocialModel[]> = new BehaviorSubject([]);
  socialTypes: BehaviorSubject<SocialTypeModel[]> = new BehaviorSubject([]);

  getPhoneNumbers() {
    return this.phoneNum.asObservable();
  }

  getPhoneTypes() {
    return this.phoneTypes.asObservable();
  }

  getSocialTypes() {
    return this.socialTypes.asObservable();
  }

  addPhoneNumber(newPhoneNum: PhoneNumberModel) {
    let newList: PhoneNumberModel[] = this.phoneNum.getValue();
    newList.push(newPhoneNum);

    this.phoneNum.next(newList);
  }

  editPhoneNumber(row: number, phoneNum: PhoneNumberModel) {
    let newList: PhoneNumberModel[] = this.phoneNum.getValue();
    newList.splice(row, 1, phoneNum);

    this.phoneNum.next(newList);
  }

  deletePhoneNumber(phoneNum: PhoneNumberModel) {
    let newList: PhoneNumberModel[] = this.phoneNum.getValue();
    let row = newList.indexOf(phoneNum);

    newList.splice(row, 1);

    this.phoneNum.next(newList);
  }

  getSocialServices() {
    return this.social.asObservable();
  }

  addSocialService(socialService: SocialModel) {
    let newList: SocialModel[] = this.social.getValue();
    newList.push(socialService);

    this.social.next(newList);
  }

  editSocialService(row: number, socialService: SocialModel) {
    let newList: SocialModel[] = this.social.getValue();
    newList.splice(row, 1, socialService);

    this.social.next(newList);
  }

  deleteSocialService(socialService: SocialModel) {
    let newList: SocialModel[] = this.social.getValue();
    let row = newList.indexOf(socialService);

    newList.splice(row, 1);

    this.social.next(newList);
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
  repositories: BehaviorSubject<RepositoryModel[]> = new BehaviorSubject([]);

  repositoryOptions: BehaviorSubject<RepositoryOptionModel[]> = new BehaviorSubject([]);
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

  getRepositories() {
    return this.repositories.asObservable();
  }

  getRepoOptions() {
    return this.repositoryOptions.asObservable();
  }

  addRepository(repository: RepositoryModel) {
    let newList: RepositoryModel[] = this.repositories.getValue();
    newList.push(repository);

    this.repositories.next(newList);
  }

  editRepository(row: number, repository: RepositoryModel) {
    let newList: RepositoryModel[] = this.repositories.getValue();
    newList.splice(row, 1, repository);

    this.repositories.next(newList);
  }

  deleteRepository(repository: RepositoryModel) {
    let newList: RepositoryModel[] = this.repositories.getValue();
    let row = newList.indexOf(repository);

    newList.splice(row, 1);

    this.repositories.next(newList);
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

  showReferees: boolean;

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

  editAchievement(row: number, achievement: AchievementModel) {
    let newList: AchievementModel[] = this.achievements.getValue();
    newList.splice(row, 1, achievement);

    this.achievements.next(newList);
  }

  deleteAchievement(achievement: AchievementModel) {
    let newList: AchievementModel[] = this.achievements.getValue();
    let row = newList.indexOf(achievement);

    newList.splice(row, 1);

    this.achievements.next(newList);
  }

  addInterestsHobbies(newInterestHobby: InterestHobbiesModel) {
    let newList: InterestHobbiesModel[] = this.interestHobbies.getValue();
    newList.push(newInterestHobby);

    this.interestHobbies.next(newList);
  }

  editInterestsHobbies(row: number, interestHobby: InterestHobbiesModel) {
    let newList: InterestHobbiesModel[] = this.interestHobbies.getValue();
    newList.splice(row, 1, interestHobby);

    this.interestHobbies.next(newList);
  }

  deleteInterestHobby(interestHobby: InterestHobbiesModel) {
    let newList: InterestHobbiesModel[] = this.interestHobbies.getValue();
    let row = newList.indexOf(interestHobby);

    newList.splice(row, 1);

    this.interestHobbies.next(newList);
  }

  addUploadedFiles(newFile: UploadFileModel) {
    let newList: UploadFileModel[] = this.uploadedFiles.getValue();
    newList.push(newFile);

    this.uploadedFiles.next(newList);
  }

}
