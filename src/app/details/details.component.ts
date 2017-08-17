import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { Router } from "@angular/router";

import { CvService } from "../shared/index";

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

  constructor(private cvService: CvService, private router: Router) { }

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

  ngOnInit() {
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
  }

  editLogin() {
    this.router.navigate(['/login']);
  }

  scrollTo(target) {
    var i;
    var startY = this.currentPosition();
    var stopY = this.elementPosition(target);
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

    // let element = document.getElementById(target);
    // console.log(target);
    // // target.scrollIntoView({ behavior: "smooth" });
    // // let content = document.getElementById('content');
    // window.scrollTo({ behavior: "smooth", left: 0, top: element.offsetTop});
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
    var element = document.getElementById(id);
    var y = element.offsetTop;
    var node = element;

    while (node.offsetParent && node.offsetParent != document.body) {
      node = <HTMLElement>node.offsetParent;
      y += node.offsetTop;
    } return y;
  }
}
