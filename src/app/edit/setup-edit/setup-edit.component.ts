import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, animate, transition, style } from "@angular/animations";
import { Router } from '@angular/router';

import { UserService } from "../../shared/index";
import { EditService } from "../edit.service";

import { AchievementModel } from '../../shared/models/achievementModel';
import { InterestHobbiesModel } from '../../shared/models/interestHobbiesModel';
import { PhoneNumberModel } from '../../shared/models/phoneNumberModel';
import { EducationModel } from '../../shared/models/educationModel';
import { CoursePaperModel } from '../../shared/models/coursePaperModel';
import { ExperienceModel } from '../../shared/models/displayModels/experienceModel';
import { SkillModel } from "../../shared/models/displayModels/skillModel";
import { TechnologyModel } from "../../shared/models/technologyModel";
import { RepositoryModel } from "../../shared/models/repositoryModel";
import { SocialModel } from "../../shared/models/socialModel";
import { ReceiveBasicModel } from '../../shared/models/httpModels/receiveBasicModel';
import { ReceiveTechModel } from '../../shared/models/httpModels/receiveTechModel';
import { ReceiveEducationModel } from '../../shared/models/httpModels/receiveEducationModel';
import { ReceiveOtherModel } from '../../shared/models/httpModels/receiveOtherModel';

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

    constructor(public router: Router, public userService: UserService, public editService: EditService) { }

    number: number = 9;

    id: number;

    ngOnInit() {

        this.status = "Checking Connection, Database and Storage";

        this.checkConnection().then(() =>
            new Promise(resolve => {
                this.status = "Database and Storage OK. Getting CV Data.";

                setTimeout(() => {
                    resolve();
                }, 1500)
            })
        ).then(() => this.getBasicDetails).then(() => Promise.all([
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
        }).catch(() => {
            this.status = "Unable to make connection to database. Please try again later."
        });
    }


    checkConnection() {
        return new Promise((resolve, reject) => {
            this.userService.checkConnection().then(result => {
                if (!result.connection || !result.database) {
                    return reject(result.err);
                }

                this.value += (100 / this.number);

                this.status = 'Connection to backend Established';

                return this.userService.checkStorageAuth().then((res) => {
                    if (res !== 'Authenticated') {
                        return reject(res);
                    }

                    this.value += (100 / this.number);

                    return resolve();
                });
            });
        });
    }

    getBasicDetails() {
        return new Promise((resolve, reject) => {
            this.userService.getBasic().subscribe(results => {
                if (results.success) {
                    const data: ReceiveBasicModel = results.results;

                    let basic = data.basic;
                    let phone = data.phone;
                    let social = data.social;

                    this.editService.id = basic.id;
                    this.editService.folderId = basic.folder_id;
                    this.editService.avatarImg = basic.avatar_img;
                    this.editService.profileImg = basic.profile_img;
                    this.editService.avatar = basic.avatar;
                    this.editService.profile = basic.profile;
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

                    this.id = basic.id;
                    this.value += (100 / this.number);
                    this.status = "Basic Details Collected";

                    return resolve();
                } else {
                    return reject();
                }
            });
        });
    }

    getSkillDetails() {
        return new Promise((resolve, reject) => {
            this.userService.getSkills(this.id).subscribe(results => {
                if (results.success) {
                    const data: SkillModel[] = results.results;

                    this.editService.skills.next(data);

                    this.value += (100 / this.number);
                    this.status = "Skill Details Collected";

                    return resolve();
                } else {
                    return reject();
                }
            });
        });
    }

    getTechnologyDetails() {
        return new Promise((resolve, reject) => {
            this.userService.getTech(this.id).subscribe(results => {
                if (results.success) {
                    const data: ReceiveTechModel = results.results;

                    let technology = data.technologies;
                    let repository = data.repositories;

                    let techData: TechnologyModel[] = [];

                    technology.forEach(tech => {
                        let t: TechnologyModel = {
                            img: tech.img,
                            imgSrc: tech.img,
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
                } else {
                    return reject();
                }
            });
        });
    }

    getExperienceDetails() {
        return new Promise((resolve, reject) => {
            this.userService.getExperience(this.id).subscribe(results => {
                if (results.success) {
                    const data: ExperienceModel[] = results.results;

                    this.editService.experienceList.next(data);

                    this.value += (100 / this.number);
                    this.status = "Experience Details Collected";

                    return resolve();
                } else {
                    return reject();
                }
            });
        });
    }

    getEducationDetails() {
        return new Promise((resolve, reject) => {
            this.userService.getEducation(this.id).subscribe(results => {
                if (results.success) {
                    const data: ReceiveEducationModel = results.results;
                    
                    let education = data.education;
                    let papers = data.papers;

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
                } else {
                    return reject();
                }
            });
        });
    }

    getOtherDetails() {
        return new Promise((resolve, reject) => {
            this.userService.getOther(this.id).subscribe(results => {
                if (results.success) {
                    const data: ReceiveOtherModel = results.results;
                    
                    let achievements = data.achievement;
                    let interests = data.interest;

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
                } else {
                    return reject();
                }
            });
        });
    }

    getType() {
        return new Promise((resolve) => {
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
