import { Component, OnInit, ViewChild } from '@angular/core';

import { SelectItem } from 'primeng/primeng';

import { EditService } from '../edit.service';
import { ConfirmationService } from 'primeng/primeng';
import { ImageCropperComponent, CropperSettings, Bounds } from "ngx-img-cropper";

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

  cropperSettings: CropperSettings = new CropperSettings();

  @ViewChild('avatarCropper', undefined) avatarCropper: ImageCropperComponent;
  @ViewChild('profileCropper', undefined) profileCropper: ImageCropperComponent;

  constructor(public editService: EditService, public confirmationService: ConfirmationService) {
    this.cropperSettings.rounded = true;
    this.cropperSettings.keepAspect = true;

    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;

    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;

    this.cropperSettings.noFileInput = true;
  }

  avatarImg: any = {};
  avatarWidth: number;
  avatarHeight: number;

  profileImg: any = {};
  profileWidth: number;
  profileHeight: number;

  uploadAvatarImage: boolean = false;
  uploadProfileImage: boolean = false;

  phoneTypes: PhoneTypeModel[] = [];
  phoneNum: PhoneNumberModel[] = [];
  selectedPhoneType: TypeModel;

  selectedPhoneNum: PhoneNumberModel = new PhoneNumberModel();
  selectedRow: number;

  newNumber: number;

  selectedSocialType: TypeModel;

  socialService: string;

  social: SocialModel[] = [];
  socialTypes: SocialTypeModel[] = [];
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

    this.editService.getSocialTypes().subscribe(types => {
      this.socialTypes = [...types];
    });

    this.editService.getSocialServices().subscribe(socialServices => {
      this.social = [...socialServices];
    });
  }

  avatarCropped(bounds: Bounds) {
    this.avatarHeight = bounds.bottom - bounds.top;
    this.avatarWidth = bounds.right - bounds.left;
  }

  profileCropped(bounds: Bounds) {
    this.profileHeight = bounds.bottom - bounds.top;
    this.profileWidth = bounds.right - bounds.left;
  }

  fileChangeListener($event, type: string) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var fileReader: FileReader = new FileReader();
    var that = this;

    fileReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;

      switch (type) {
        case 'avatar':
          that.avatarCropper.setImage(image);
          break;
        case 'profile':
          that.profileCropper.setImage(image);
          break;
      }
    }

    fileReader.readAsDataURL(file);
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
    let image: HTMLImageElement = new Image();

    let that = this;
    image.onload = () => {
      that.avatarCropper.setImage(image);
    };

    image.src = this.editService.avatar;

    this.uploadAvatarImage = true;
  }

  saveAndCloseAvatarDialog() {
    this.editService.avatar = this.avatarImg.image;

    this.avatarCropper.reset();
    this.uploadAvatarImage = false;
  }

  closeAvatarDialog() {
    this.avatarCropper.reset();
    this.uploadAvatarImage = false;
  }

  UploadProfile() {
    let image: HTMLImageElement = new Image();

    let that = this;
    image.onload = () => {
      that.profileCropper.setImage(image);
    };

    image.src = this.editService.profile;

    this.uploadProfileImage = true;
  }

  saveAndCloseProfileDialog() {
    this.editService.profile = this.profileImg.image;

    this.profileCropper.reset();
    this.uploadProfileImage = false;
  }

  closeProfileDialog() {
    this.profileCropper.reset();
    this.uploadProfileImage = false;
  }
}
