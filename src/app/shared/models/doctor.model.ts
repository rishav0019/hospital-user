import { Image } from "./image.model";
import { NumberValueAccessor } from "@angular/forms";
export interface Doctor {
  id?: string;

  name: string;
  regno?: string;
  gender?: genderTypes;
  mobileNumber: string;
  address?: string;
  city?: string;
  email?: string;
  // status?: string;
  consultationFee?: number;
  subsImage?: Image;
  speciality?: string;
  state?: string;
  // commission?: string;
  creationDate?: Date;
  services?: string[];
  modifictaionDate?: Date;
  educationDetails?: string[];
  degree?: string;
  experiences?: string[];
  memberships?: string[];
  specializations?: string[];
  awards?: string[];
  about?: string;
  availableOn?: string[];
  yearOfExperience: number;

  timings?: TimeSlot[];
}

enum genderTypes {
  "MALE",
  "FEMALE"
}

export interface TimeSlot {
  slot?: string; //morning evening night
  startTime?: string;
  endTime?: string;
}
