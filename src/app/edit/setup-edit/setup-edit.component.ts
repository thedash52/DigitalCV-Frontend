import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, animate, transition, style } from "@angular/animations";
import { Router } from '@angular/router';

import { UserService } from "../../shared/index";
import { EditService } from "../edit.service";

import { AchievementModel } from '../../shared/models/achievementModel';
import { InterestHobbiesModel } from '../../shared/models/interestHobbiesModel';
import { UploadFileModel } from '../../shared/models/uploadFileModel';
import { PhoneNumberModel } from '../../shared/models/phoneNumberModel';
import { PhoneTypeModel } from '../../shared/models/phoneTypeModel';
import { EducationModel } from '../../shared/models/educationModel';
import { CoursePaperModel } from '../../shared/models/coursePaperModel';
import { ExperienceModel } from '../../shared/models/experienceModel';
import { SkillModel } from "../../shared/models/skillModel";
import { TechnologyModel } from "../../shared/models/technologyModel";
import { RepositoryOptionModel } from "../../shared/models/repositoryOptionModel";
import { RepositoryModel } from "../../shared/models/repositoryModel";
import { SocialModel } from "../../shared/models/socialModel";
import { SocialTypeModel } from "../../shared/models/socialTypeModel";

@Component({
  selector: 'app-setup-edit',
  animations: [
    trigger('visibilityChanged', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0.0 })),
      transition('1 => 0', animate('800ms ease-out')),
      transition("0 => 1", animate('800ms ease-in'))
    ]),
    trigger('valueChanged', [
      state('null => *', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state('* => null', style({
        opacity: 1,
        transform: 'translateX(100%)'
      })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out'))
    ])
  ],
  templateUrl: './setup-edit.component.html',
  styleUrls: ['./setup-edit.component.scss']
})
export class SetupEditComponent implements OnInit {
  @Input() isVisible: boolean = true;
  value: number = 0;
  @Input() status: string = "";

  constructor(private router: Router, private userService: UserService, private editService: EditService) { }

  number: number = 8;

  ngOnInit() {
    let textInterval = setInterval(() => {
      this.isVisible = !this.isVisible;
    }, 1500);

    this.status = "Checking Connection and Database";

    this.checkConnection().then(() =>
      new Promise(resolve => {
        this.status = "Connection to backend established. Getting CV Data.";

        setTimeout(() => {
          resolve();
        }, 1500)
      })
    ).then(() => Promise.all([
      this.getBasicDetails(),
      this.getSkillDetails(),
      this.getTechnologyDetails(),
      this.getExperienceDetails(),
      this.getEducationDetails(),
      this.getOtherDetails(),
      this.getType()
    ])).then(() => {
        this.status = "Data Collection Complete. CV Ready for edit. Displaying Edit Basic Details Page.";
        this.editService.setUp = true;

        setTimeout(() => {
          this.router.navigate(['/edit/basic']);
        }, 1500)
      }).catch(err => {
        this.status = "Unable to make connection to database. Please try again later."
      });
  }


  checkConnection() {
    return new Promise((resolve, reject) => {
      this.userService.checkConnection().subscribe(result => {
        if (!result.connection || !result.database) {
          return reject(result.err);
        }

        this.value += (100 / this.number);

        return resolve();
      });
    });
  }

  getBasicDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getBasic().subscribe(results => {
        let basic = results.basic;
        let phone = results.phone;
        let social = results.social;

        this.editService.id = basic.id;
        this.editService.avatarImg = basic.avatar_img;
        this.editService.profileImg = basic.profile_img;
        this.editService.name = basic.name;
        this.editService.address1 = basic.address_1;
        this.editService.address2 = basic.address_2;
        this.editService.address3 = basic.address_3;
        this.editService.city = basic.city;
        this.editService.summary = basic.summary;

        this.editService.showReferees = basic.show_referees;
        this.editService.showRepositories = basic.show_repositories;

        let phoneNum: PhoneNumberModel[] = [];

        phone.forEach(ph => {
          let phNum: PhoneNumberModel = {
            type: ph.type,
            number: ph.number
          }

          phoneNum.push(phNum);
        });

        this.editService.phoneNum.next(phoneNum);

        let socialData: SocialModel[] = [];

        social.forEach(soc => {
          let social: SocialModel = {
            type: soc.type,
            link: soc.link
          }

          socialData.push(social);
        })

        this.editService.social.next(socialData);

        this.value += (100 / this.number);
        this.status = "Basic Details Collected";

        return resolve();
      });
    });
  }

  getSkillDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getSkills().subscribe(results => {
        let skillData: SkillModel[] = [];

        results.forEach(skill => {
          let s: SkillModel = {
            detail: skill.details,
            category: skill.category
          }

          skillData.push(s);
        });

        this.editService.skills.next(skillData);

        this.value += (100 / this.number);
        this.status = "Skill Details Collected";

        return resolve();
      });
    });
  }

  getTechnologyDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getTech().subscribe(results => {
        let technology = results.technologies;
        let repository = results.repositories;

        let techData: TechnologyModel[] = [];

        technology.forEach(tech => {
          let t: TechnologyModel = {
            img: tech.img,
            name: tech.name,
            detail: tech.detail,
            category: tech.category,
            src: tech.link
          }

          techData.push(t);
        });

        this.editService.technologies.next(techData);

        let repoData: RepositoryModel[] = [];

        repository.forEach(repo => {
          let r: RepositoryModel = {
            type: repo.type,
            link: repo.link
          }

          repoData.push(r);
        });

        this.editService.repositories.next(repoData);

        this.value += (100 / this.number);
        this.status = "Technology Details Collected";

        return resolve();
      });
    });
  }

  getExperienceDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getExperience().subscribe(results => {
        let experienceData: ExperienceModel[] = [];

        results.forEach(experience => {
          let e: ExperienceModel = {
            img: experience.image,
            title: experience.title,
            location: experience.location,
            description: experience.description,
            startDate: experience.start_date,
            endDate: experience.end_date,
            current: experience.current
          }

          experienceData.push(e);
        });

        this.editService.experienceList.next(experienceData);

        this.value += (100 / this.number);
        this.status = "Experience Details Collected";

        return resolve();
      });
    });
  }

  getEducationDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getEducation().subscribe(results => {
        let education = results.education;
        let papers = results.papers;

        let educationData: EducationModel[] = [];

        education.forEach(edu => {
          let paperData: CoursePaperModel[] = [];

          papers.forEach(paper => {
            if (edu.id == paper.course) {
              let p: CoursePaperModel = {
                code: paper.code,
                name: paper.name,
                details: paper.detail,
                grade: paper.grade
              }

              paperData.push(p);
            }
          });

          let e: EducationModel = {
            img: edu.img,
            course: edu.course,
            school: edu.school,
            src: edu.link,
            year: +edu.year,
            papers: paperData
          }

          educationData.push(e);
        });

        this.editService.educationList.next(educationData);

        this.value += (100 / this.number);
        this.status = "Education Details Collected";

        return resolve();
      });
    });
  }

  getOtherDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getOther().subscribe(results => {
        let achievements = results.achievement;
        let interests = results.interest;

        let achievementData: AchievementModel[] = [];

        achievements.forEach(achievement => {
          let a: AchievementModel = {
            name: achievement.name,
            where: achievement.where,
            whatWhy: achievement.whatWhy
          }

          achievementData.push(a);
        });

        this.editService.achievements.next(achievementData);

        let interestData: InterestHobbiesModel[] = [];

        interests.forEach(interest => {
          let i: InterestHobbiesModel = {
            name: interest.name,
            img: interest.img
          }

          interestData.push(i);
        });

        this.editService.interestHobbies.next(interestData);

        this.value += (100 / this.number);
        this.status = "Other Details Collected";

        return resolve();
      });
    });
  }

  getType() {
    return new Promise((resolve, reject) => {
      this.userService.getType().subscribe(result => {
        let editPhoneType = [];
        let editSocialType = [];
        let editRepoType = [];

        result.forEach(type => {
          switch (type.category) {
            case "repository":
              editRepoType.push({
                label: type.long,
                value: {
                  id: type.id,
                  short: type.short,
                  long: type.long
                }
              });
              break;
            case "phone":
              editPhoneType.push({
                label: type.long,
                value: {
                  id: type.id,
                  short: type.short,
                  long: type.long
                }
              });
              break;
            case "social":
              editSocialType.push({
                label: type.long,
                value: {
                  id: type.id,
                  short: type.short,
                  long: type.long
                }
              });
              break;
          }
        });

        this.editService.phoneTypes.next(editPhoneType);
        this.editService.socialTypes.next(editSocialType);
        this.editService.repositoryOptions.next(editRepoType);

        this.value += (100 / this.number);
        this.status = "Types Collected";

        return resolve();
      });
    });
  }
}
