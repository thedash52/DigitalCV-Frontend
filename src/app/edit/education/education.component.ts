import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/primeng';
import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

import { EducationModel } from '../../shared/models/educationModel';
import { CoursePaperModel } from '../../shared/models/coursePaperModel';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  constructor(private editService: EditService, private cvService: CvService, private confirmationService: ConfirmationService) { }

  educationList: EducationModel[] = [];
  selectedCourse: EducationModel = new EducationModel();
  selectedRow: number;

  editDetails: boolean = false;
  showPapers: boolean = false;

  ngOnInit() {
    this.editService.getEducationList().subscribe(educationList => {
      this.educationList = educationList;
    });

    var coursePapers: CoursePaperModel[] = [];
    coursePapers.push({ code: "D111", name: "Test Paper", details: "Test Paper", grade: "A+" });
    coursePapers.push({ code: "D111", name: "Test Paper", details: "Test Paper", grade: "A+" });
    coursePapers.push({ code: "D111", name: "Test Paper", details: "Test Paper", grade: "A+" });
    coursePapers.push({ code: "D111", name: "Test Paper", details: "Test Paper", grade: "A+" });

    this.educationList.push({ img: "http://placehold.it/60x60", course: "Test Course 1", school: "Test School", src: "http://www.ucol.ac.nz/", year: 2016, papers: coursePapers });
    this.educationList.push({ img: "http://placehold.it/60x60", course: "Test Course 2", school: "Test School", src: "http://www.ucol.ac.nz/", year: 2016, papers: coursePapers });
    this.educationList.push({ img: "http://placehold.it/60x60", course: "Test Course 3", school: "Test School", src: "http://www.ucol.ac.nz/", year: 2015, papers: coursePapers });
    this.educationList.push({ img: "http://placehold.it/60x60", course: "Test Course 4", school: "Test School", src: "http://www.ucol.ac.nz/", year: 2016, papers: coursePapers });

    if (!this.editService.inUse) {

    }
  }

  courseSelected($event) {
    this.showPapers = true;
  }

  closePapersDialog() {
    this.selectedCourse = new EducationModel();
    this.showPapers = false;
  }

  editCourseDetails(row: number, course: EducationModel) {
    this.selectedCourse = course;
    this.selectedRow = row;
    this.editDetails = true;
  }

  saveAndCloseEditDialog() {
    this.educationList.splice(this.selectedRow, 1, this.selectedCourse);

    this.selectedCourse = new EducationModel();
    this.selectedRow = null;
    this.editDetails = false;
  }

  closeEditDialog() {
    this.selectedCourse = new EducationModel();
    this.selectedRow = null;
    this.editDetails = false;
  }

  deleteCourse(row) {
    this.confirmationService.confirm({
      message: 'Are you sure you would like to delete this record?',
      accept: () => {
        this.editService.deleteEducationRecord(row);

        console.log(this.educationList);
        // this.educationList.splice(row, 1);
      }
    });
  }

  addPaper() {
    this.selectedCourse.papers.push({code: "", name: "", details: "", grade: ""});
  }

  deletePaper(row) {
    let newPaperList: CoursePaperModel[] = this.selectedCourse.papers;
    newPaperList.splice(row, 1);

    this.selectedCourse.papers = newPaperList;

    console.log(this.selectedCourse.papers);
  }

  uploadImage() {
    
  }
}
