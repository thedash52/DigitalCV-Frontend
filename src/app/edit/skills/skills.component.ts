import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/primeng';
import { EditService } from '../edit.service';

import { SkillModel } from '../../shared/models/skillModel';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  constructor(public editService: EditService, public confirmationService: ConfirmationService) { }

  skills: SkillModel[];
  selectedSkill: SkillModel = new SkillModel();
  selectedRow: number;

  options: SelectItem[];

  editDetails: boolean = false;
  addSkill: boolean = false;

  ngOnInit() {
    this.editService.getSkills().subscribe(skills => {
      this.skills = [...skills];

      let newOptions: SelectItem[] = [];
      for (var i = 0; i < this.skills.length; i++) {
        let e = this.skills[i].category;

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

  newSkill() {
    this.selectedSkill = new SkillModel();

    this.addSkill = true;
  }

  addAndCloseAddDialog() {
    this.editService.addSkill(this.selectedSkill);

    this.selectedSkill = new SkillModel();
    this.addSkill = false;
  }

  closeAddDialog() {
    this.selectedSkill = new SkillModel();
    this.addSkill = false;
  }

  editSkillDetails(skill: SkillModel) {
    this.selectedSkill = skill;

    let row = this.skills.indexOf(skill);

    this.selectedRow = row;
    this.editDetails = true;
  }

  saveAndCloseEditDialog() {
    this.editService.editSkill(this.selectedRow, this.selectedSkill);

    this.selectedRow = null;
    this.selectedSkill = new SkillModel();
    this.editDetails = false;
  }

  closeEditDialog() {
    this.selectedRow = null;
    this.selectedSkill = new SkillModel();
    this.editDetails = false;
  }

  deleteSkill(skill: SkillModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you would like to delete this record?',
      accept: () => {
        this.editService.deleteSkill(skill);
      }
    });
  }
}
