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
  selectedPhoneTypes: SelectItem;

  newNumber: number;

  ngOnInit() {
    this.phoneTypes = [];
    this.phoneNum = [];

    this.phoneTypes.push({ label: 'Mobile', value: 'm' });
    this.phoneTypes.push({ label: 'Home', value: 'h' });
    this.phoneTypes.push({ label: 'Work', value: 'w' });

    if (!this.editService.inUse) {

    }
  }

  AddNumber() {
    this.phoneNum.push({ type: this.selectedPhoneTypes.label, number: this.newNumber});
  }
}
