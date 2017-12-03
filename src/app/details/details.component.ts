import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { Router } from "@angular/router";

import { Message, SelectItem } from "primeng/primeng";
import { MatIconRegistry } from '@angular/material';

import { CvService } from "../shared/index";
import { EditService } from "../edit/index";
import { UserService } from "../shared/index";

import { PhoneModel } from "../shared/models/displayModels/phoneModel";
import { SocialModel } from "../shared/models/displayModels/socialReceiveModel";
import { SkillModel } from "../shared/models/displayModels/skillModel";
import { TechnologyModel } from "../shared/models/displayModels/technologyModel";
import { RepositoryModel } from "../shared/models/displayModels/repositoryModel";
import { ExperienceModel } from "../shared/models/displayModels/experienceModel";
import { EducationModel } from "../shared/models/displayModels/educationModel";
import { PaperModel } from "../shared/models/displayModels/paperModel";
import { AchievementModel } from "../shared/models/displayModels/achievementModel";
import { InterestModel } from "../shared/models/displayModels/interestModel";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private cvService: CvService, private editService: EditService, private userService: UserService, private router: Router, private icons:MatIconRegistry) { }

  loggedIn: boolean = false;

  phoneData: PhoneModel[] = [];
  socialData: SocialModel[] = [];
  skillData: SkillModel[] = [];
  techData: TechnologyModel[] = [];
  repoData: RepositoryModel[] = [];
  experienceData: ExperienceModel[] = [];
  educationData: EducationModel[] = [];
  paperData: PaperModel[] = [];
  achievementData: AchievementModel[] = [];
  interestData: InterestModel[] = [];

  busy: Promise<any>;
  showPage: boolean = false;
  msgs: Message[] = [];

  ngOnInit() {
    this.icons.registerFontClassAlias("default", "fa fa-chevron-right");

    this.cvService.getPhone().subscribe(results => {
      this.phoneData = [...results];
    });

    this.cvService.getSocial().subscribe(results => {
      this.socialData = [...results];
    });

    this.cvService.getSkills().subscribe(results => {
      this.skillData = [...results];
    });

    this.cvService.getTechnologies().subscribe(results => {
      this.techData = [...results];
    });

    this.cvService.getRepositories().subscribe(results => {
      this.repoData = [...results];
    });

    this.cvService.getExperience().subscribe(results => {
      this.experienceData = [...results];
    });

    this.cvService.getEducation().subscribe(results => {
      this.educationData = [...results];
    });

    this.cvService.getPapers().subscribe(results => {
      this.paperData = [...results];
    });

    this.cvService.getAchievements().subscribe(results => {
      this.achievementData = [...results];
    });

    this.cvService.getInterests().subscribe(results => {
      this.interestData = [...results];
    });

    if (!this.cvService.setUp.getValue()) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Data Missing', detail: 'Data has not been collected. Navigating to load data page.' });

      setTimeout(() => {
        this.router.navigate(['']);
      }, 3000);
    } else {
      this.showPage = true;

      this.userService.checkLogin().subscribe(result => {
        this.loggedIn = true;
      }, err => {
        if (err.status === 401) {
          this.loggedIn = false;
        }
      });
    }
  }

  login() {
    this.userService.loginRoute = 'return';
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn = false;
  }

  getPapers(id: number) {
    var paperData: PaperModel[] = [];

    this.paperData.forEach(paper => {
      if (paper.course == id) {
        paperData.push(paper);
      }
    });

    return paperData;
  }

  openTech(link: string) {
    window.open("http://" + link, "_blank");
  }

  openRepo(link: string) {
    window.open("http://" + link, "_blank");
  }

  openCourse(link: string) {
    window.open("http://" + link, "_blank");
  }

  configureSkills(): any {
    var configuredSkills: {
      rowNum: number;
      column: {
        columnNum: number;
        value: SelectItem;
      }[];
    }[] = [];
    // var configuredSkills: SelectItem[] = [];

    let categories = [];

    this.skillData.forEach(skill => {
      let currentCategory = skill.category;
      let categoryExists: boolean = false;

      categories.forEach(category => {
        if (category == currentCategory) {
          categoryExists = true;
        }
      });

      if (!categoryExists) {
        categories.push(currentCategory);
      }
    });

    var columnNum: number = 1;
    var rowNum: number = 1;

    categories.forEach(category => {
      let relatedSkills = [];
      let columnData: {
        columnNum: number;
        value: SelectItem;
      }[] = [];

      this.skillData.forEach(skill => {
        if (skill.category == category) {
          relatedSkills.push(skill.details);
        }
      });

      columnData.push({
        columnNum: columnNum,
        value: ({
          label: category,
          value: relatedSkills
        })
      });

      if (columnNum == 3) {
        configuredSkills.push({
          rowNum: rowNum,
          column: columnData
        });

        columnNum = 1;
        rowNum++;
      } else {
        columnNum++;
      }

      // configuredSkills.push({ label: category, value: relatedSkills });
    });

    return configuredSkills;
  }

  editRoute(route: string) {
    this.busy = this.setupEdit().then(() =>
      this.router.navigate([route])
    );
  }

  setupEdit() {
    return new Promise((resolve, reject) => {
      this.editService.id = this.cvService.basic.id;
      this.editService.folderId = this.cvService.basic.folder_id;
      this.editService.profileImg = this.cvService.basic.profile_img;
      this.editService.avatarImg = this.cvService.basic.avatar_img;
      this.editService.avatar = this.cvService.basic.avatar;
      this.editService.profile = this.cvService.basic.profile;
      this.editService.name = this.cvService.basic.name;
      this.editService.address1 = this.cvService.basic.address_1;
      this.editService.address2 = this.cvService.basic.address_2;
      this.editService.address3 = this.cvService.basic.address_3;
      this.editService.city = this.cvService.basic.city;
      this.editService.summary = this.cvService.basic.summary;

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

  scrollTo(target) {
    var i;
    var startY = this.currentPosition();
    var stopY = this.elementPosition(target) - 70;
    var distance = stopY > startY ? stopY - startY : startY - stopY;

    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }

    var speed = Math.round(distance / 100);

    if (speed >= 20) {
      speed = 20;
    }

    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 1;

    if (stopY > startY) {
      i = startY;
      this.scrollTimerDown(i, stopY, leapY, timer, speed, step);
      return;
    }

    i = startY;
    this.scrollTimerUp(i, stopY, leapY, timer, speed, step);
  }

  scrollTimerDown(i, stopY, leapY, timer, speed, step) {
    setTimeout(() => {
      window.scrollTo(0, leapY);

      leapY += step;

      if (leapY > stopY) {
        leapY = stopY;
        timer++;
      }

      i += step;

      if (i < stopY) {
        this.scrollTimerDown(i, stopY, leapY, timer, speed, step);
      }
    }, timer * speed);
  }

  scrollTimerUp(i, stopY, leapY, timer, speed, step) {
    setTimeout(() => {
      window.scrollTo(0, leapY);

      leapY -= step;

      if (leapY < stopY) {
        leapY = stopY;
        timer++;
      }

      i -= step;

      if (i > stopY) {
        this.scrollTimerUp(i, stopY, leapY, timer, speed, step);
      }
    }, timer * speed);
  }

  currentPosition() {
    if (window.pageYOffset) {
      return window.pageYOffset;
    }

    if (document.documentElement && document.documentElement.scrollTop) {
      return document.documentElement.scrollTop;
    }

    if (document.body.scrollTop) {
      return document.body.scrollTop;
    }

    return 0;
  }

  elementPosition(id) {
    if (id == "basic") {
      return 0;
    }

    var element = document.getElementById(id);
    var y = element.offsetTop;
    var node = element;

    while (node.offsetParent && node.offsetParent != document.body) {
      node = <HTMLElement>node.offsetParent;
      y += node.offsetTop;
    } return y;
  }
}
