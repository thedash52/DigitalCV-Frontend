import { Component, OnInit } from '@angular/core';

import { AchievementModel } from '../../shared/models/achievementModel';
import { InterestHobbiesModel } from '../../shared/models/interestHobbiesModel';
import { UploadFileModel } from '../../shared/models/uploadFileModel';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

  constructor(private editService: EditService, private cvService: CvService) { }

  achievementName: string;
  achievementWhere: string;
  achievementWhatWhy: string;

  achievements: AchievementModel[] = [];

  interestImage: string;
  interestName: string;

  interestsHobbies: InterestHobbiesModel[] = [];

  showReferees: boolean;

  uploadedFiles: UploadFileModel[] = [];

  ngOnInit() {

    this.editService.getAchievements().subscribe(achievements => {
      this.achievements = achievements;
    });

    this.editService.getInterestsHobbies().subscribe(interestsHobbies => {
      this.interestsHobbies = interestsHobbies;
    });

    this.editService.getUploadedFiles().subscribe(uploadedFiles => {
      this.uploadedFiles = uploadedFiles;
    });

    this.editService.addUploadedFiles({ thumbnail: "http://placehold.it/60x60", name: "Test", src: "" });
    this.editService.addUploadedFiles({ thumbnail: "http://placehold.it/60x60", name: "Test", src: "" });
    this.editService.addUploadedFiles({ thumbnail: "http://placehold.it/60x60", name: "Test", src: "" });
    this.editService.addUploadedFiles({ thumbnail: "http://placehold.it/60x60", name: "Test", src: "" });

    if (!this.editService.inUse) {

    }
  }

  AddAchievement() {
    this.editService.addAchievement({ name: this.achievementName, where: this.achievementWhere, whatWhy: this.achievementWhatWhy });

    this.achievementName = "";
    this.achievementWhere = "";
    this.achievementWhatWhy = "";
  }

  AddImage() {
    this.interestImage = "http://placehold.it/30x30";
  }

  AddInterestHobby() {
    this.editService.addInterestsHobbies({ name: this.interestName, img: this.interestImage });

    this.interestImage = null;
    this.interestName = "";
  }
}
