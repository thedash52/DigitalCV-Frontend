import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style } from "@angular/animations";
import { Router } from '@angular/router';

import { UserService, CvService } from "../shared/index";
import { EditService } from "../edit/index";

import { ReceiveBasicModel } from "../shared/models/httpModels/receiveBasicModel";
import { ConnectionCheck } from "../shared/models/httpModels/connectionCheckModel";
import { SkillModel } from "../shared/models/displayModels/skillModel";
import { ReceiveTechModel } from "../shared/models/httpModels/receiveTechModel";
import { ExperienceModel } from "../shared/models/displayModels/experienceModel";
import { ReceiveEducationModel } from "../shared/models/httpModels/receiveEducationModel";
import { ReceiveOtherModel } from "../shared/models/httpModels/receiveOtherModel";

@Component({
  selector: 'app-test-site',
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
  templateUrl: './test-site.component.html',
  styleUrls: ['./test-site.component.css']
})
export class TestSiteComponent implements OnInit {
  @Input() isVisible: boolean = true;
  value: number = 0;
  @Input() status: string = "";

  constructor(private router: Router, private userService: UserService, private cvService: CvService, private editService: EditService) { }

  number: number = 7 + 6;

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
        }, 1500);
      })
    ).then(() => Promise.all([
      this.getBasicDetails(),
      this.getSkillDetails(),
      this.getTechnologyDetails(),
      this.getExperienceDetails(),
      this.getEducationDetails(),
      this.getOtherDetails()
    ])).then(() =>
      new Promise(resolve => {
        this.status = "Data Collection Complete. Verifying Data.";

        setTimeout(() => {
          resolve();
        }, 1500);
      })).then(() =>
        Promise.all([
          this.verifyBasic(),
          this.verifySkills(),
          this.verifyTech(),
          this.verifyExperience(),
          this.verifyEducation(),
          this.verifyOther()
        ])).then(() => {
          this.status = "Data Verified. Preperations Complete. Displaying CV.";
          this.cvService.setUp = true;

          setTimeout(() => {
            clearInterval(textInterval);

            this.router.navigate(['/details']);
          }, 2000);
        }).catch((route: string | any) => {
          if (typeof (route) == "string") {
            this.status = "Data Missing. Redirecting to edit page.";

            setTimeout(() => {
              clearInterval(textInterval);

              this.userService.checkLogin().subscribe(result => {
                this.setupEdit().then(() => {
                  this.router.navigate([route]);
                });
              }, (err) => {
                if (err.status === 401) {
                  this.setupEdit().then(() => {
                    this.userService.loginRoute = route;

                    this.router.navigate(['/login']);
                  });
                }
              });
            }, 2000)
          } else if (typeof (route) == "boolean") {
            this.status = "Data Validation Failed.";
          } else {
            this.status = "Error. Reattempting setup."

            setTimeout(() => {
              clearInterval(textInterval);

              window.location.reload();
            }, 2000);
          }
        });
  }

  setupEdit() {
    return new Promise((resolve, reject) => {
      // if (this.cvService.basic && this.cvService.phone.getValue().length > 0 && this.cvService.social.getValue().length > 0 && this.cvService.skills.getValue().length > 0 &&
      //   this.cvService.technologies.getValue().length > 0 && this.cvService.repositories.getValue().length > 0 && this.cvService.experience.getValue().length > 0 &&
      //   this.cvService.education.getValue().length > 0 && this.cvService.papers.getValue().length > 0 && this.cvService.achievements.getValue().length > 0 &&
      //   this.cvService.interest.getValue().length > 0) {
      if (this.cvService.basic) {
        this.editService.id = this.cvService.basic.id;
        this.editService.profileImg = this.cvService.basic.profile_img;
        this.editService.avatarImg = this.cvService.basic.avatar_img;
        this.editService.name = this.cvService.basic.name;
        this.editService.address1 = this.cvService.basic.address_1;
        this.editService.address2 = this.cvService.basic.address_2;
        this.editService.address3 = this.cvService.basic.address_3;
        this.editService.city = this.cvService.basic.city;
        this.editService.summary = this.cvService.basic.summary;
      } else {
        this.editService.name = "";
        this.editService.address1 = "";
        this.editService.address2 = "";
        this.editService.address3 = "";
        this.editService.city = "";
        this.editService.summary = "";

        this.editService.showReferees = true;
        this.editService.showRepositories = true;
      }

      this.editService.phoneNum.next(this.cvService.phone.getValue());
      this.editService.social.next(this.cvService.social.getValue());

      let display = this.cvService.skills.getValue();
      let edit = [];

      display.forEach(skill => {
        edit.push({
          detail: skill.details,
          category: skill.category
        });
      });

      this.editService.skills.next(edit);

      this.editService.showRepositories = this.cvService.basic.show_repositories;

      let displayTech = this.cvService.technologies.getValue();
      let displayRepositories = this.cvService.repositories.getValue();
      let editTech = [];
      let editRepositories = [];

      displayTech.forEach(tech => {
        editTech.push({
          img: tech.img,
          name: tech.name,
          detail: tech.detail,
          category: tech.category,
          src: tech.link
        });
      });

      displayRepositories.forEach(repo => {
        editRepositories.push({
          type: repo.type,
          link: repo.link
        });
      });

      this.editService.technologies.next(editTech);
      this.editService.repositories.next(editRepositories);

      let displayExperience = this.cvService.experience.getValue();
      let editExperience = [];

      displayExperience.forEach(experience => {
        editExperience.push({
          img: experience.image,
          title: experience.title,
          location: experience.location,
          desciption: experience.description,
          startDate: experience.start_date,
          endDate: experience.end_date,
          current: experience.current
        });
      });

      this.editService.experienceList.next(editExperience);

      let displayEducation = this.cvService.education.getValue();
      let displayPapers = this.cvService.papers.getValue();
      let editEducation = [];

      displayEducation.forEach(education => {
        let newItem = {
          img: education.img,
          course: education.course,
          school: education.school,
          src: education.link,
          year: education.year,
          papers: null
        };

        let editPaper = [];

        displayPapers.forEach(paper => {
          if (education.id == paper.course) {
            editPaper.push({
              code: paper.code,
              name: paper.name,
              details: paper.detail,
              grade: paper.grade
            });
          }
        });

        newItem.papers = editPaper;
        editEducation.push(newItem);
      });

      this.editService.educationList.next(editEducation);

      this.editService.showReferees = this.cvService.basic.show_referees;

      let displayAchievements = this.cvService.achievements.getValue();
      let displayInterest = this.cvService.interest.getValue();
      let editAchievements = [];
      let editInterest = [];

      displayAchievements.forEach(achievement => {
        editAchievements.push({
          name: achievement.name,
          where: achievement.where,
          whatWhy: achievement.whatWhy
        });
      });

      displayInterest.forEach(interest => {
        editInterest.push({
          name: interest.name,
          img: interest.img
        });
      });

      this.editService.achievements.next(editAchievements);
      this.editService.interestHobbies.next(editInterest);


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

        this.editService.setUp = true;

        return resolve();
      });
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
        if (results.basic != null || results.phone.length > 0) {
          this.cvService.basic = results.basic;
          this.cvService.phone.next(results.phone);
          this.cvService.social.next(results.social);

          this.value += (100 / this.number);
          this.status = "Basic Details Collected";

          return resolve();
        } else {
          return reject('/edit/basic');
        }
      });
    });
  }

  getSkillDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getSkills().subscribe(results => {
        if (results.length > 0) {
          this.cvService.skills.next(results);

          this.value += (100 / this.number);
          this.status = "Skill Details Collected";

          return resolve();
        } else {
          return reject('/edit/skills');
        }
      });
    });
  }

  getTechnologyDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getTech().subscribe(results => {
        if (results.technologies.length > 0) {
          this.cvService.technologies.next(results.technologies);
          this.cvService.repositories.next(results.repositories);

          this.value += (100 / this.number);
          this.status = "Technology Details Collected";

          return resolve();
        } else {
          return reject('/edit/technology');
        }
      });
    });
  }

  getExperienceDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getExperience().subscribe(results => {
        if (results.length > 0) {
          this.cvService.experience.next(results);

          this.value += (100 / this.number);
          this.status = "Experience Details Collected";

          return resolve();
        } else {
          return reject('/edit/experience')
        }
      });
    });
  }

  getEducationDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getEducation().subscribe(results => {
        if (results.education.length > 0) {
          this.cvService.education.next(results.education);
          this.cvService.papers.next(results.papers);

          this.value += (100 / this.number);
          this.status = "Education Details Collected";

          return resolve();
        } else {
          return reject('/edit/education');
        }
      });
    });
  }

  getOtherDetails() {
    return new Promise((resolve, reject) => {
      this.userService.getOther().subscribe(results => {
        if (results.achievement.length > 0 || results.interest.length > 0) {
          this.cvService.achievements.next(results.achievement);
          this.cvService.interest.next(results.interest);

          this.value += (100 / this.number);
          this.status = "Other Details Collected";

          return resolve();
        } else {
          return reject('/edit/other');
        }
      });
    });
  }

  verifyBasic() {
    return new Promise((resolve, reject) => {
      let basic: ReceiveBasicModel = new ReceiveBasicModel();
      basic.basic = this.cvService.basic;
      basic.phone = this.cvService.phone.getValue();
      basic.social = this.cvService.social.getValue();

      this.userService.verifyBasic(basic).then(result => {
        if (result.basic && result.phone && result.social) {
          this.value += (100 / this.number);
          this.status = "Basic Details Verified";

          return resolve();
        } else {
          this.status = "Basic Details Incorrect.";

          return reject(false);
        }
      });
    });
  }

  verifySkills() {
    return new Promise((resolve, reject) => {
      this.userService.verifySkill(this.cvService.skills.getValue()).then(result => {
        if (result) {
          this.value += (100 / this.number);
          this.status = "Skill Details Verified";

          return resolve();
        } else {
          this.status = "Skill Details Incorrect";

          return reject(false);
        }
      });
    });
  }

  verifyTech() {
    return new Promise((resolve, reject) => {
      let technology: ReceiveTechModel = new ReceiveTechModel();
      technology.technologies = this.cvService.technologies.getValue();
      technology.repositories = this.cvService.repositories.getValue();

      this.userService.verifyTech(technology).then(result => {
        if (result) {
          this.value += (100 / this.number);
          this.status = "Technology Details Verified";

          return resolve();
        } else {
          this.status = "Technology Details Incorrect";

          return reject(false);
        }
      });
    });
  }

  verifyExperience() {
    return new Promise((resolve, reject) => {
      this.userService.verifyExperience(this.cvService.experience.getValue()).then(result => {
        if (result) {
          this.value += (100 / this.number);
          this.status = "Experience Details Verified";

          return resolve();
        } else {
          this.status = "Experience Details Incorrect";

          return reject(false);
        }
      });
    });
  }

  verifyEducation() {
    return new Promise((resolve, reject) => {
      let education: ReceiveEducationModel = new ReceiveEducationModel();
      education.education = this.cvService.education.getValue();
      education.papers = this.cvService.papers.getValue();

      this.userService.verifyEducation(education).then(result => {
        if (result) {
          this.value += (100 / this.number);
          this.status = "Education Details Verified";

          return resolve();
        } else {
          this.status = "Education Details Incorrect";

          return reject(false);
        }
      });
    });
  }

  verifyOther() {
    return new Promise((resolve, reject) => {
      let other: ReceiveOtherModel = new ReceiveOtherModel();
      other.achievement = this.cvService.achievements.getValue();
      other.interest = this.cvService.interest.getValue();

      this.userService.verifyOther(other).then(result => {
        if (result) {
          this.value += (100 / this.number);
          this.status = "Other Details Verified";

          return resolve();
        } else {
          this.status = "Other Details Incorrect";

          return reject(false);
        }
      });
    });
  }
}
