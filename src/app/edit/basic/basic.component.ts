import { Component, OnInit } from '@angular/core';

import { SelectItem } from 'primeng/primeng';

import { EditService } from '../edit.service';
import { ConfirmationService } from 'primeng/primeng';

import { PhoneNumberModel } from '../../shared/models/phoneNumberModel';
import { PhoneTypeModel } from '../../shared/models/phoneTypeModel';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  constructor(private editService: EditService, private confirmationService: ConfirmationService) { }

  phoneTypes: PhoneTypeModel[] = [];
  phoneNum: PhoneNumberModel[] = [];
  selectedPhoneType: any;

  selectedPhoneNum: PhoneNumberModel = new PhoneNumberModel();
  selectedRow: number;

  newNumber: number;

  editNumberDetails: boolean = false;

  ngOnInit() {
    this.editService.getPhoneNumbers().subscribe(phoneNumbers => {
      this.phoneNum = [...phoneNumbers];
    });

    this.editService.getPhoneTypes().subscribe(phoneTypes => {
      this.phoneTypes = [...phoneTypes];
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

  UploadAvatar() {
    console.log("Uploading Avatar");
  }

  UploadProfile() {
    console.log("Uploading Profile");
  }
}
