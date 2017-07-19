import { Component, OnInit } from '@angular/core';

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

  achievements: any[];

  interestImage: string;
  interestName: string;

  interestsHobbies: any[];

  uploadedFiles: any[];

  ngOnInit() {
    this.achievements = [];
    this.interestsHobbies = [];
    this.uploadedFiles = [];

    this.uploadedFiles.push({thumbnail: "http://placehold.it/60x60", name: "Test", src: ""});
    this.uploadedFiles.push({thumbnail: "http://placehold.it/60x60", name: "Test", src: ""});
    this.uploadedFiles.push({thumbnail: "http://placehold.it/60x60", name: "Test", src: ""});
    this.uploadedFiles.push({thumbnail: "http://placehold.it/60x60", name: "Test", src: ""});

    if (!this.editService.inUse) {

    }
  }

  AddAchievement() {
    this.achievements.push({ name: this.achievementName, where: this.achievementWhere, whatWhy: this.achievementWhatWhy });

    this.achievementName = "";
    this.achievementWhere = "";
    this.achievementWhatWhy = "";
  }

  AddImage() {
    this.interestImage = "http://placehold.it/30x30";
  }

  AddInterestHobby() {
    this.interestsHobbies.push({ name: this.interestName, img: this.interestImage });

    this.interestImage = null;
    this.interestName = "";
  }
}
