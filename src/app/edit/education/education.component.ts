import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/primeng';
import { EditService } from '../edit.service';

import { EducationModel } from '../../shared/models/educationModel';
import { CoursePaperModel } from '../../shared/models/coursePaperModel';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  constructor(public editService: EditService, public confirmationService: ConfirmationService) { }

  educationList: EducationModel[] = [];
  selectedCourse: EducationModel = new EducationModel();
  selectedRow: number;

  editDetails: boolean = false;
  showPapers: boolean = false;
  addCourse: boolean = false;

  ngOnInit() {
    this.editService.getEducationList().subscribe(educationList => {
      this.educationList = [...educationList];
    });
  }

  newCourse() {
    this.selectedCourse = new EducationModel();
    this.selectedCourse.img = "http://placehold.it/60x60";
    this.selectedCourse.papers = [];

    this.addCourse = true;
  }

  courseSelected($event) {
    this.showPapers = true;
  }

  closePapersDialog() {
    this.selectedCourse = new EducationModel();
    this.showPapers = false;
  }

  editCourseDetails(course: EducationModel) {
    this.selectedCourse = course;

    let row = this.educationList.indexOf(course);

    this.selectedRow = row;
    this.editDetails = true;
  }

  addAndCloseAddDialog() {
    this.editService.addEducationRecord(this.selectedCourse);

    this.selectedCourse = new EducationModel();
    this.addCourse = false;
  }

  closeAddDialog() {
    this.selectedCourse = new EducationModel();
    this.addCourse = false;
  }

  saveAndCloseEditDialog() {
    this.editService.editEducationRecord(this.selectedRow, this.selectedCourse);

    this.selectedCourse = new EducationModel();
    this.selectedRow = null;
    this.editDetails = false;
  }

  closeEditDialog() {
    this.selectedCourse = new EducationModel();
    this.selectedRow = null;
    this.editDetails = false;
  }

  deleteCourse(course: EducationModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you would like to delete this record?',
      accept: () => {
        this.editService.deleteEducationRecord(course);
      }
    });
  }

  addPaper() {
    let newPapers: CoursePaperModel[] = this.selectedCourse.papers;
    newPapers.push({ code: "", name: "", details: "", grade: "" });

    this.selectedCourse.papers = [...newPapers];
  }

  deletePaper(row) {
    let newPaperList: CoursePaperModel[] = this.selectedCourse.papers;
    newPaperList.splice(row, 1);

    this.selectedCourse.papers = [];
    this.selectedCourse.papers = [...newPaperList];
  }

  uploadImage() {

  }
}
