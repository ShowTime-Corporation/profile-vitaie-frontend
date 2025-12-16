import { EducationItem } from './education-item';
import { ExperienceItem } from './experience-item';
import { UserSkillsDTO } from './user-skills-dto';

export interface UserProfileRequestDTO {
  firstName: string;
  lastName: string;
  degree: string;
  location: string;
  yearsOfExperience: number;
  bio: string;
  skills: UserSkillsDTO;
  experience: ExperienceItem[];
  education: EducationItem[];
}
