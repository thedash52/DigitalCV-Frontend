import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/primeng';
import { EditService } from '../edit.service';

import { TechnologyModel } from '../../shared/models/technologyModel';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss']
})
export class TechnologyComponent implements OnInit {

  constructor(private editService: EditService, private confirmationService: ConfirmationService) { }

  technologies: TechnologyModel[];
  selectedTechnology: TechnologyModel = new TechnologyModel();
  selectedRow: number;

  options: SelectItem[];

  editDetails: boolean = false;
  addTechnology: boolean = false;

  ngOnInit() {
    this.editService.getTechnologies().subscribe(technologies => {
      this.technologies = [...technologies];

      let newOptions: SelectItem[] = [];

      for (var i = 0; i < this.technologies.length; i++) {
        var e = this.technologies[i].category;

        let categoryExists: boolean = false;

        newOptions.forEach(option => {
          if (option.label == e && option.value == e) {
            categoryExists = true;
          }
        });

        if (!categoryExists) {
          newOptions.push({ label: e, value: e });
        }
      }

      this.options = [...newOptions];
    });
  }

  newTechnology() {
    this.selectedTechnology = new TechnologyModel();
    this.selectedTechnology.img = "http://placehold.it/60x60";

    this.addTechnology = true;
  }

  addAndCloseAddDialog() {
    this.editService.addTechnology(this.selectedTechnology);

    this.selectedTechnology = new TechnologyModel();
    this.addTechnology = false;
  }

  closeAddDialog() {
    this.selectedTechnology = new TechnologyModel();
    this.addTechnology = false;
  }

  editTechnology(technology: TechnologyModel) {
    this.selectedTechnology = technology;

    let row = this.technologies.indexOf(technology);

    this.selectedRow = row;
    this.editDetails = true;
  }

  saveAndCloseEditDialog() {
    this.editService.editSkill(this.selectedRow, this.selectedTechnology);

    this.selectedRow = null;
    this.selectedTechnology = new TechnologyModel();
    this.editDetails = false;
  }

  closeEditDialog() {
    this.selectedRow = null;
    this.selectedTechnology = new TechnologyModel();
    this.editDetails = false;
  }

  deleteTechnology(technology: TechnologyModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you would like to delete this record?',
      accept: () => {
        this.editService.deleteSkill(technology);
      }
    });
  }

  uploadImage() {

  }
}
