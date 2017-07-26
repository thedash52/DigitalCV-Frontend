import { Component, OnInit } from '@angular/core';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';
import { ConfirmationService } from 'primeng/primeng';

import { ExperienceModel } from '../../shared/models/experienceModel';

@Component({
  selector: 'app-experiance',
  templateUrl: './experiance.component.html',
  styleUrls: ['./experiance.component.scss']
})
export class ExperianceComponent implements OnInit {

  constructor(private editService: EditService, private cvService: CvService, private confirmationService: ConfirmationService) { }

  experienceList: ExperienceModel[] = [];

  selectedExperience: ExperienceModel = new ExperienceModel();
  selectedRow: number;

  selectedStartDate: Date;
  selectedEndDate: Date;

  editExperience: boolean = false;
  addExperience: boolean = false;

  currentJob: boolean = false;

  ngOnInit() {
    this.editService.getExperienceList().subscribe(experienceList => {
      this.experienceList = [...experienceList];
    });

    if (!this.editService.inUse) {

    }
  }

  newExperience() {
    this.selectedExperience = new ExperienceModel();
    this.selectedExperience.img = "http://placehold.it/60x60";
    this.currentJob = false;

    this.addExperience = true;
  }

  addAndCloseAddDialog() {
    this.selectedExperience.startDate = this.selectedStartDate.toDateString();

    if (this.selectedEndDate) {
      this.selectedExperience.endDate = this.selectedEndDate.toDateString();
    }

    this.editService.addExperience(this.selectedExperience);

    this.selectedExperience = new ExperienceModel();
    this.selectedStartDate = new Date();
    this.selectedStartDate = new Date();
    this.currentJob = false;
    this.addExperience = false;
  }

  closeAddDialog() {
    this.selectedExperience = new ExperienceModel();
    this.selectedStartDate = new Date();
    this.selectedStartDate = new Date();
    this.currentJob = false;
    this.addExperience = false;
  }

  editExperienceDetails(experience: ExperienceModel) {
    this.selectedExperience = experience;
    this.selectedStartDate = new Date(experience.startDate);

    if (experience.endDate == "" || !experience.endDate) {
      this.currentJob = true;
    } else {
      this.selectedEndDate = new Date(experience.endDate);
      this.currentJob = false;
    }

    let row = this.experienceList.indexOf(experience);

    this.selectedRow = row;
    this.editExperience = true;
    console.log(this.selectedExperience);
  }

  saveAndCloseEditDialog() {
    this.selectedExperience.startDate = this.selectedStartDate.toDateString();

    if (this.selectedEndDate && !this.currentJob) {
      this.selectedExperience.endDate = this.selectedEndDate.toDateString();
    }

    this.editService.editExperience(this.selectedRow, this.selectedExperience);

    this.selectedExperience = new ExperienceModel();
    this.selectedRow = null;
    this.selectedStartDate = new Date();
    this.selectedStartDate = new Date();
    this.currentJob = false;
    this.editExperience = false;
  }

  closeEditDialog() {
    this.selectedExperience = new ExperienceModel();
    this.selectedRow = null;
    this.selectedStartDate = new Date();
    this.selectedStartDate = new Date();
    this.currentJob = false;
    this.editExperience = false;
  }

  deleteExperience(experience) {
    this.confirmationService.confirm({
      message: 'Are you sure you would like to delete this record?',
      accept: () => {
        this.editService.deleteExperience(experience);
      }
    });
  }

  uploadImage() {

  }
}
