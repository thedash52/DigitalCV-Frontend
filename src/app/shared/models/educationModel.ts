import { CoursePaperModel } from './coursePaperModel';

export class EducationModel {
    img: string;
    course: string;
    school: string;
    src: string;
    year: number;
    papers: CoursePaperModel[];
}