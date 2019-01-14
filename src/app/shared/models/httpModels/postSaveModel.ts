import { BasicModel } from "../displayModels/basicModel";
import { PhoneNumberModel } from "../phoneNumberModel";
import { SocialModel } from "../socialModel";
import { SkillModel } from "../displayModels/skillModel";
import { TechnologyModel } from "../technologyModel";
import { RepositoryModel } from "../repositoryModel";
import { ExperienceModel } from "../displayModels/experienceModel";
import { EducationModel } from "../educationModel";
import { AchievementModel } from "../achievementModel";
import { InterestHobbiesModel } from "../interestHobbiesModel";

export class PostSaveModel {
    basic: BasicModel;
    phone: PhoneNumberModel[];
    social: SocialModel[];
    skill: SkillModel[];
    technology: TechnologyModel[];
    repository: RepositoryModel[];
    experience: ExperienceModel[];
    education: EducationModel[];
    achievement: AchievementModel[];
    interest: InterestHobbiesModel[];
}