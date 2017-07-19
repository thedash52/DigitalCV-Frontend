import { Component, OnInit } from '@angular/core';

import { SelectItem } from 'primeng/primeng';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  constructor(private editService: EditService, private cvService: CvService) { }

  phoneTypes: SelectItem[];
  phoneNum: any[];
  selectedPhoneType: any;

  newNumber: number;

  ngOnInit() {
    this.phoneTypes = [];
    this.phoneNum = [];
    this.selectedPhoneType = null;

    this.phoneTypes.push({ label: 'Mobile', value: { short: 'm', long: 'Mobile'} });
    this.phoneTypes.push({ label: 'Home', value: { short: 'h', long: 'Home'} });
    this.phoneTypes.push({ label: 'Work', value: { short: 'w', long: 'Work'} });

    if (!this.editService.inUse) {

    }
  }

  AddNumber() {
    console.log(this.selectedPhoneType);
    this.phoneNum.push({ type: this.selectedPhoneType, number: this.newNumber});
  }

  UploadAvatar() {

  }

  UploadProfile() {

  }
}
