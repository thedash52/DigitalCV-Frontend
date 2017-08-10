import { Component, OnInit } from '@angular/core';

import { SelectItem } from 'primeng/primeng';

import { EditService } from '../edit.service';
import { ConfirmationService } from 'primeng/primeng';

import { PhoneNumberModel } from '../../shared/models/phoneNumberModel';
import { PhoneTypeModel } from '../../shared/models/phoneTypeModel';
import { TypeModel } from "../../shared/models/typeModel";
import { SocialTypeModel } from "../../shared/models/socialTypeModel";
import { SocialModel } from "../../shared/models/socialModel";


@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  constructor(private editService: EditService, private confirmationService: ConfirmationService) { }

  phoneTypes: PhoneTypeModel[] = [];
  phoneNum: PhoneNumberModel[] = [];
  selectedPhoneType: TypeModel;

  selectedPhoneNum: PhoneNumberModel = new PhoneNumberModel();
  selectedRow: number;

  newNumber: number;

  selectedSocialType: TypeModel;

  socialService: string;

  social: SocialModel[] = [];
  selectedSocial: SocialModel = new SocialModel();
  selectedSocialRow: number;

  editNumberDetails: boolean = false;
  editSocial: boolean = false;

  ngOnInit() {
    this.selectedSocial.type = new TypeModel();

    this.editService.getPhoneNumbers().subscribe(phoneNumbers => {
      this.phoneNum = [...phoneNumbers];
    });

    this.editService.getPhoneTypes().subscribe(phoneTypes => {
      this.phoneTypes = [...phoneTypes];
    });

    this.editService.getSocialServices().subscribe(socialServices => {
      this.social = [...socialServices];
    });
  }

  AddNumber() {
    this.editService.addPhoneNumber({ type: this.selectedPhoneType, number: this.newNumber });

    this.selectedPhoneType = null;
    this.newNumber = null;
  }

  editNumber(phoneNum: PhoneNumberModel) {
    this.selectedPhoneNum = phoneNum;

    let row = this.phoneNum.indexOf(phoneNum);

    this.selectedRow = row;
    this.editNumberDetails = true;
  }

  saveAndCloseEditDialog() {
    this.editService.editPhoneNumber(this.selectedRow, this.selectedPhoneNum);

    this.selectedPhoneNum = new PhoneNumberModel();
    this.selectedRow = null;
    this.editNumberDetails = false;
  }

  closeEditDialog() {
    this.selectedPhoneNum = new PhoneNumberModel();
    this.selectedRow = null;
    this.editNumberDetails = false;
  }

  deleteNumber(phoneNumber: PhoneNumberModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the number ' + phoneNumber.number + '?',
      accept: () => {
        this.editService.deletePhoneNumber(phoneNumber)
      }
    });
  }

  AddSocial() {
    let socialService: SocialModel = { link: this.socialService, type: this.selectedSocialType };

    this.editService.addSocialService(socialService);

    this.socialService = null;
    this.selectedSocialType = null;
  }

  editSocialService(socialService: SocialModel) {
    this.selectedSocial = socialService;

    let row = this.social.indexOf(socialService);

    this.selectedSocialRow = row;
    this.editSocial = true;
  }

  saveAndCloseSocialDialog() {
    this.editService.editSocialService(this.selectedSocialRow, this.selectedSocial);

    this.selectedSocial = new SocialModel();
    this.selectedSocialRow = null;
    this.editSocial = false;
  }

  closeSocialDialog() {
    this.selectedSocial = new SocialModel();
    this.selectedSocialRow = null;
    this.editSocial = false;
  }

  deleteSocialService(socialService: SocialModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the social service: ' + socialService.type.short + socialService.link + '?',
      accept: () => {
        this.editService.deleteSocialService(socialService);
      }
    });
  }

  UploadAvatar() {
    console.log("Uploading Avatar");
  }

  UploadProfile() {
    console.log("Uploading Profile");
  }
}
