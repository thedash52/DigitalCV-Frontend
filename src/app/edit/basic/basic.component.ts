import { Component, OnInit } from '@angular/core';

import { SelectItem } from 'primeng/primeng';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

import { PhoneNumberModel } from '../../shared/models/phoneNumberModel';
import { PhoneTypeModel } from '../../shared/models/phoneTypeModel';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  constructor(private editService: EditService, private cvService: CvService) { }

  phoneTypes: PhoneTypeModel[] = [];
  phoneNum: PhoneNumberModel[] = [];
  selectedPhoneType: any;

  newNumber: number;

  ngOnInit() {
    this.editService.getPhoneNumbers().subscribe(phoneNumbers => {
      this.phoneNum = phoneNumbers;
    });

    this.phoneTypes.push({ label: 'Mobile', value: { short: 'm', long: 'Mobile'} });
    this.phoneTypes.push({ label: 'Home', value: { short: 'h', long: 'Home'} });
    this.phoneTypes.push({ label: 'Work', value: { short: 'w', long: 'Work'} });

    if (!this.editService.inUse) {

    }
  }

  AddNumber() {
    this.editService.addPhoneNumber({ type: this.selectedPhoneType, number: this.newNumber});
  }

  UploadAvatar() {
    console.log("Uploading Avatar");
  }

  UploadProfile() {
    console.log("Uploading Profile");    
  }
}
