import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/primeng';
import { EditService } from '../edit.service';
import { ImageCropperComponent, CropperSettings, Bounds } from "ng2-img-cropper";

import { TechnologyModel } from '../../shared/models/technologyModel';
import { TypeModel } from "../../shared/models/typeModel";
import { RepositoryModel } from "../../shared/models/repositoryModel";
import { SelectItem } from 'primeng/primeng';
import { RepositoryOptionModel } from "../../shared/models/repositoryOptionModel";

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss']
})
export class TechnologyComponent implements OnInit {

  cropperSettings: CropperSettings = new CropperSettings();

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(private editService: EditService, private confirmationService: ConfirmationService) {
    this.cropperSettings.rounded = true;
    this.cropperSettings.keepAspect = true;

    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;

    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;

    this.cropperSettings.noFileInput = true;
  }

  data: any = {};
  dataWidth: number;
  dataHeight: number;

  technologies: TechnologyModel[];
  selectedTechnology: TechnologyModel = new TechnologyModel();
  selectedRow: number;

  repositories: RepositoryModel[];
  repositoryTypes: RepositoryOptionModel[] = [];
  selectedRepositoryType: TypeModel = new TypeModel();
  selectedRepository: RepositoryModel = new RepositoryModel();
  selectedRepositoryRow: number;

  options: SelectItem[];

  newRepository: string;

  editDetails: boolean = false;
  addTechnology: boolean = false;
  editRepositoryDetails: boolean = false;

  ngOnInit() {
    this.selectedRepository.type = new TypeModel();

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

    this.editService.getRepoOptions().subscribe(types => {
      this.repositoryTypes = [...types];
    });

    this.editService.getRepositories().subscribe(repositories => {
      this.repositories = [...repositories];
    });
  }

  cropped(bounds: Bounds) {
    this.dataWidth = bounds.right - bounds.left;
    this.dataHeight = bounds.bottom - bounds.top;
  }

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var fileReader: FileReader = new FileReader();
    var that = this;

    fileReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;

      that.cropper.setImage(image);
    }

    fileReader.readAsDataURL(file);
  }

  addRepository() {
    let repository: RepositoryModel = {type: this.selectedRepositoryType, link: this.newRepository};

    this.editService.addRepository(repository);

    this.selectedRepositoryType = new TypeModel();
    this.newRepository = null;
  }

  editRepository(repository: RepositoryModel) {
    this.selectedRepository = repository;

    let row = this.repositories.indexOf(repository);

    this.selectedRepositoryRow = row;
    this.editRepositoryDetails = true;
  }

  saveAndCloseRepositoryDialog() {
    this.editService.editRepository(this.selectedRepositoryRow, this.selectedRepository);

    this.selectedRepository = new RepositoryModel();
    this.selectedRepository.type = new TypeModel();
    this.selectedRepositoryRow = null;
    this.editRepositoryDetails = false;
  }

  closeRepositoryDialog() {
    this.selectedRepository = new RepositoryModel();
    this.selectedRepository.type = new TypeModel();
    this.selectedRepositoryRow = null;
    this.editRepositoryDetails = false;
  }

  deleteRepository(repository: RepositoryModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you would like to delete the repository link: ' + repository.type.short + ':' + repository.link,
      accept: () => {
        this.editService.deleteRepository(repository);
      }
    });
  }

  newTechnology() {
    this.selectedTechnology = new TechnologyModel();
    
    let image: any = new Image();
    let that = this;

    image.onloadend = () => {
      that.cropper.setImage(image);
    }

    image.src = "http://placehold.it/60x60";

    this.addTechnology = true;
  }

  addAndCloseAddDialog() {
    this.selectedTechnology.img = this.data.image;
    this.editService.addTechnology(this.selectedTechnology);

    this.selectedTechnology = new TechnologyModel();
    this.cropper.reset();
    this.addTechnology = false;
  }

  closeAddDialog() {
    this.selectedTechnology = new TechnologyModel();
    this.cropper.reset();
    this.addTechnology = false;
  }

  editTechnology(technology: TechnologyModel) {
    this.selectedTechnology = technology;

    let image: HTMLImageElement = new Image();
    let that = this;

    image.onload = () => {
      that.cropper.setImage(image);
    }

    image.src = this.selectedTechnology.img;

    let row = this.technologies.indexOf(technology);

    this.selectedRow = row;
    this.editDetails = true;
  }

  saveAndCloseEditDialog() {
    this.selectedTechnology.img = this.data.image;
    this.editService.editSkill(this.selectedRow, this.selectedTechnology);

    this.selectedRow = null;
    this.selectedTechnology = new TechnologyModel();
    this.cropper.reset();
    this.data = {};
    this.editDetails = false;
  }

  closeEditDialog() {
    this.selectedRow = null;
    this.selectedTechnology = new TechnologyModel();
    this.cropper.reset();
    this.data = {};
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
}
