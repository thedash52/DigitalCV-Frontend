import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { BasicModel } from "./models/displayModels/basicModel";
import { PhoneModel } from "./models/displayModels/phoneModel";
import { SocialModel } from "./models/displayModels/socialReceiveModel";
import { SkillModel } from "./models/displayModels/skillModel";
import { TechnologyModel } from "./models/displayModels/technologyModel";
import { RepositoryModel } from "./models/displayModels/repositoryModel";
import { ExperienceModel } from "./models/displayModels/experienceModel";
import { EducationModel } from "./models/displayModels/educationModel";
import { PaperModel } from "./models/displayModels/paperModel";
import { AchievementModel } from "./models/displayModels/achievementModel";
import { InterestModel } from "./models/displayModels/interestModel";

@Injectable()
export class CvService {

  constructor() { }

  setUp: boolean = false;

  basic: BasicModel;
  phone: BehaviorSubject<PhoneModel[]> = new BehaviorSubject([]);
  social: BehaviorSubject<SocialModel[]> = new BehaviorSubject([]);

  skills: BehaviorSubject<SkillModel[]> = new BehaviorSubject([]);

  technologies: BehaviorSubject<TechnologyModel[]> = new BehaviorSubject([]);
  repositories: BehaviorSubject<RepositoryModel[]> = new BehaviorSubject([]);

  experience: BehaviorSubject<ExperienceModel[]> = new BehaviorSubject([]);

  education: BehaviorSubject<EducationModel[]> = new BehaviorSubject([]);
  papers: BehaviorSubject<PaperModel[]> = new BehaviorSubject([]);

  achievements: BehaviorSubject<AchievementModel[]> = new BehaviorSubject([]);
  interest: BehaviorSubject<InterestModel[]> = new BehaviorSubject([]);

  getPhone() {
    return this.phone.asObservable();
  }

  getSocial() {
    return this.social.asObservable();
  }

  getSkills() {
    return this.skills.asObservable();
  }

  getTechnologies() {
    return this.technologies.asObservable();
  }

  getRepositories() {
    return this.repositories.asObservable();
  }

  getExperience() {
    return this.experience.asObservable();
  }

  getEducation() {
    return this.education.asObservable();
  }

  getPapers() {
    return this.papers.asObservable();
  }

  getAchievements() {
    return this.achievements.asObservable();
  }

  getInterests() {
    return this.interest.asObservable();
  }
}
