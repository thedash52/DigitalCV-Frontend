import { Component, OnInit } from '@angular/core';

import { AchievementModel } from '../../shared/models/achievementModel';
import { InterestHobbiesModel } from '../../shared/models/interestHobbiesModel';
import { UploadFileModel } from '../../shared/models/uploadFileModel';

import { EditService } from '../edit.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

  constructor(public editService: EditService, public confirmationService: ConfirmationService) { }

  achievementName: string;
  achievementWhere: string;
  achievementWhatWhy: string;

  achievements: AchievementModel[] = [];

  interestImage: string;
  interestName: string;

  interestsHobbies: InterestHobbiesModel[] = [];

  showReferees: boolean;

  uploadedFiles: UploadFileModel[] = [];

  selectedAchievement: AchievementModel = new AchievementModel();
  selectedInterestHobby: InterestHobbiesModel = new InterestHobbiesModel();
  selectedRow: number;

  editAchievementDetails: boolean = false;
  editInterestHobbyDetails: boolean = false;

  ngOnInit() {
    this.editService.getAchievements().subscribe(achievements => {
      this.achievements = [...achievements];
    });

    this.editService.getInterestsHobbies().subscribe(interestsHobbies => {
      this.interestsHobbies = [...interestsHobbies];
    });

    this.editService.getUploadedFiles().subscribe(uploadedFiles => {
      this.uploadedFiles = [...uploadedFiles];
    });
  }

  AddAchievement() {
    this.editService.addAchievement({ name: this.achievementName, where: this.achievementWhere, whatWhy: this.achievementWhatWhy });

    this.achievementName = "";
    this.achievementWhere = "";
    this.achievementWhatWhy = "";
  }

  editAchievement(achievement: AchievementModel) {
    this.selectedAchievement = achievement;

    let row = this.achievements.indexOf(achievement);

    this.selectedRow = row;
    this.editAchievementDetails = true;
  }

  saveAndCloseAchievementDialog() {
    this.editService.editAchievement(this.selectedRow, this.selectedAchievement);

    this.selectedAchievement = new AchievementModel();
    this.selectedRow = null;
    this.editAchievementDetails = false;
  }

  closeAchievementDialog() {
    this.selectedAchievement = new AchievementModel();
    this.selectedRow = null;
    this.editAchievementDetails = false;
  }

  deleteAchievement(achievement: AchievementModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you would like to delete this achievement?',
      accept: () => {
        this.editService.deleteAchievement(achievement);
      }
    });
  }

  AddImage() {
    this.interestImage = "http://placehold.it/30x30";
  }

  AddInterestHobby() {
    this.editService.addInterestsHobbies({ name: this.interestName, img: this.interestImage });

    this.interestImage = null;
    this.interestName = "";
  }

  editInterestHobby(interestHobby: InterestHobbiesModel) {
    this.selectedInterestHobby = interestHobby;

    let row = this.interestsHobbies.indexOf(interestHobby);

    this.selectedRow = row;
    this.editInterestHobbyDetails = true;
  }

  saveAndCloseInterestDialog() {
    this.editService.editInterestsHobbies(this.selectedRow, this.selectedInterestHobby);

    this.selectedInterestHobby = new InterestHobbiesModel();
    this.selectedRow = null;
    this.editInterestHobbyDetails = false;
  }

  closeInterestDialog() {
    this.selectedInterestHobby = new InterestHobbiesModel();
    this.selectedRow = null;
    this.editInterestHobbyDetails = false;
  }

  deleteInterestHobby(interestHobby: InterestHobbiesModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you would like to delete this record?',
      accept: () => {
        this.editService.deleteInterestHobby(interestHobby);
      }
    });
  }

  uploadImage() {
    this.selectedInterestHobby.img = "http://placehold.it/30x30";
  }
}
