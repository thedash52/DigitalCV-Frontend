import { Component, OnInit } from '@angular/core';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  constructor(private editService: EditService, private cvService: CvService) { }

  ngOnInit() {
    if (!this.editService.inUse) {
      
    }
  }

}
