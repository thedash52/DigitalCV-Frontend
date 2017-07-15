import { Component, OnInit } from '@angular/core';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

  constructor(private editService: EditService, private cvService: CvService) { }

  ngOnInit() {
    if (!this.editService.inUse) {
      
    }
  }

}
