import { Component, OnInit } from '@angular/core';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

@Component({
  selector: 'app-experiance',
  templateUrl: './experiance.component.html',
  styleUrls: ['./experiance.component.scss']
})
export class ExperianceComponent implements OnInit {

  constructor(private editService: EditService, private cvService: CvService) { }

  ngOnInit() {
    if (!this.editService.inUse) {
      
    }
  }

}
