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
  addSkill: boolean = false;

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

}
