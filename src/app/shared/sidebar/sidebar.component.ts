import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from "primeng/primeng";

import { EditService } from "../../edit/edit.service";
import { UserService } from "../user.service";

import { PostSaveModel } from "../models/httpModels/postSaveModel";
import { BasicModel } from "../models/displayModels/basicModel";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private editService: EditService) { }

  msg: Message[] = [];
  busy: Promise<any>;

  ngOnInit() {
  }

  Save() {
    this.busy = this.collectData().then((saveData: PostSaveModel) => this.userService.SaveEdit(saveData).then((result) => {
      if (!result.err && result.result) {
        this.msg = [];
        this.msg.push({severity: 'success', summary: 'Save Result', detail: 'Save Successful'});

        setTimeout(() => {
          this.editService.setUp = false;
          this.router.navigate(['']);
        }, 2000);
      } else {
        this.msg = [];
        this.msg.push({severity: 'error', summary: 'Save Result', detail: 'Save Failed'});
      }
    }));
  }

  collectData() {
    return new Promise((resolve, reject) => {
      let saveData: PostSaveModel = new PostSaveModel();

      saveData.basic = new BasicModel();
      saveData.basic.id = this.editService.id;
      saveData.basic.folder_id = this.editService.folderId;
      saveData.basic.name = this.editService.name;
      saveData.basic.avatar_img = this.editService.avatarImg;
      saveData.basic.profile_img = this.editService.profileImg;
      saveData.basic.avatar = this.editService.avatar;
      saveData.basic.profile = this.editService.profile;
      saveData.basic.address_1 = this.editService.address1;
      saveData.basic.address_2 = this.editService.address2;
      saveData.basic.address_3 = this.editService.address3;
      saveData.basic.city = this.editService.city;
      saveData.basic.summary = this.editService.summary;
      saveData.basic.show_referees = this.editService.showReferees;
      saveData.basic.show_repositories = this.editService.showRepositories;

      saveData.phone = this.editService.phoneNum.getValue();
      saveData.social = this.editService.social.getValue();
      saveData.skill = this.editService.skills.getValue();
      saveData.technology = this.editService.technologies.getValue();
      saveData.repository = this.editService.repositories.getValue();
      saveData.experience = this.editService.experienceList.getValue();
      saveData.education = this.editService.educationList.getValue();
      saveData.achievement = this.editService.achievements.getValue();
      saveData.interest = this.editService.interestHobbies.getValue();

      return resolve(saveData);
    }); 
  }

  Cancel() {
    this.editService.setUp = false;
    this.router.navigate(['']);
  }
}
