import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService, CvService } from "../shared/index";
import { EditService } from './edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public router: Router, public userService: UserService, public cvService: CvService, public editService: EditService) {
    this.userService.checkLogin().subscribe(result => {
      if (!this.editService.setUp) {
        this.router.navigate(['/setup-edit']);
      } else {
        this.cvService.setUp.next(false);
      }
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
  }

}
