import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style } from "@angular/animations";
import { Router } from '@angular/router';

import { UserService, CvService } from "../shared/index";

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

  constructor(private router: Router, private userService: UserService, private cvService: CvService) { }

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

          setTimeout(() => {
            clearInterval(textInterval);

            this.router.navigate(['/details']);
          }, 2000);
        }).catch((route: string | any) => {
          if (typeof(route) == "string") {
            this.status = "Data Missing. Redirecting to edit page.";

            setTimeout(() => {
              clearInterval(textInterval);

              this.router.navigate([route]);
            }, 2000)
          } else {
            this.status = "Data Corrupted. Reattempting setup."

            setTimeout(() => {
              clearInterval(textInterval);

              window.location.reload();
            }, 2000);
          }
        });

    // let gaugeInterval = setInterval(() => {
    //   this.value = this.value + Math.floor(Math.random() * 10) + 1;

    //   this.status = null;
    //   this.status = this.value.toString();

    //   if (this.value >= 100) {
    //     this.value = 100;

    //     clearInterval(gaugeInterval);
    //     clearInterval(textInterval);

    //     setTimeout(() => {
    //       this.router.navigate(['/details']);
    //     }, 2000);
    //   }
    // }, 1000);
  }

  checkConnection() {
    return new Promise((resolve, reject) => {
      this.userService.checkConnection().subscribe(result => {
        if (!result.connection || !result.database) {
          console.log(result.err);
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
        if (result) {
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
