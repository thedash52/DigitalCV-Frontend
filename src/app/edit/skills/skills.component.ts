import { Component, OnInit } from '@angular/core';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  constructor(private editService: EditService, private cvService: CvService) { }

  ngOnInit() {
    if (!this.editService.inUse) {
      
    }
  }

}
