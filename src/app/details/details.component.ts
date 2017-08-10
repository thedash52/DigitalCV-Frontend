import { Component, OnInit } from '@angular/core';

import { CvService } from "../shared/index";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private cvService: CvService) { }

  ngOnInit() {
    console.log(this.cvService.basic);

    this.cvService.getPhone().subscribe(results => {
      console.log(results);
    });

    this.cvService.getSocial().subscribe(results => {
      console.log(results);
    });

    this.cvService.getSkills().subscribe(results => {
      console.log(results);
    });

    this.cvService.getTechnologies().subscribe(results => {
      console.log(results);
    });

    this.cvService.getRepositories().subscribe(results => {
      console.log(results);
    });

    this.cvService.getExperience().subscribe(results => {
      console.log(results);
    });

    this.cvService.getEducation().subscribe(results => {
      console.log(results);
    });

    this.cvService.getPapers().subscribe(results => {
      console.log(results);
    });

    this.cvService.getAchievements().subscribe(results => {
      console.log(results);
    });

    this.cvService.getInterests().subscribe(results => {
      console.log(results);
    });
  }
}
