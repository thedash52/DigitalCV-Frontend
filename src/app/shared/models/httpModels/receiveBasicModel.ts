import { BasicModel } from "../displayModels/basicModel";
import { PhoneModel } from "../displayModels/phoneModel";
import { SocialModel } from "../displayModels/socialReceiveModel";

export class ReceiveBasicModel {
    basic: BasicModel;
    phone: PhoneModel[];
    social: SocialModel[];
}