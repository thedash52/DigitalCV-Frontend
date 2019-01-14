import { Component, OnInit } from '@angular/core';

import { EditService } from '../edit.service';
import { ConfirmationService } from 'primeng/primeng';

import { ExperienceModel } from '../../shared/models/displayModels/experienceModel';

@Component({
  selector: 'app-experiance',
  templateUrl: './experiance.component.html',
  styleUrls: ['./experiance.component.scss']
})
export class ExperianceComponent implements OnInit {

  constructor(public editService: EditService, public confirmationService: ConfirmationService) { }

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
  }

  newExperience() {
    this.selectedExperience = new ExperienceModel();
    this.selectedExperience.image = "http://placehold.it/60x60";
    this.selectedExperience.current = false;

    this.addExperience = true;
  }

  addAndCloseAddDialog() {
    this.selectedExperience.start_date = this.selectedStartDate;

    if (!this.selectedExperience.current) {
      this.selectedExperience.end_date = this.selectedEndDate;
    }

    this.editService.addExperience(this.selectedExperience);

    this.selectedExperience = new ExperienceModel();
    this.selectedStartDate = new Date();
    this.selectedStartDate = new Date();
    this.addExperience = false;
  }

  closeAddDialog() {
    this.selectedExperience = new ExperienceModel();
    this.selectedStartDate = new Date();
    this.selectedStartDate = new Date();
    this.addExperience = false;
  }

  editExperienceDetails(experience: ExperienceModel) {
    this.selectedExperience = experience;
    this.selectedStartDate = new Date(experience.start_date);
    this.selectedEndDate = new Date(experience.end_date);

    let row = this.experienceList.indexOf(experience);

    this.selectedRow = row;
    this.editExperience = true;
  }

  saveAndCloseEditDialog() {
    this.selectedExperience.start_date = this.selectedStartDate;

    if (!this.selectedExperience.current) {
      this.selectedExperience.end_date = this.selectedEndDate;
    }

    this.editService.editExperience(this.selectedRow, this.selectedExperience);

    this.selectedExperience = new ExperienceModel();
    this.selectedRow = null;
    this.selectedStartDate = new Date();
    this.selectedStartDate = new Date();
    this.editExperience = false;
  }

  closeEditDialog() {
    this.selectedExperience = new ExperienceModel();
    this.selectedRow = null;
    this.selectedStartDate = new Date();
    this.selectedStartDate = new Date();
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
