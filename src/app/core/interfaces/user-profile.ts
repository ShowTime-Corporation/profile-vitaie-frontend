import { ExperienceItem } from '../../features/edit-profile/interfaces/experience-item';
import { EducationItem } from '../../features/edit-profile/interfaces/education-item';

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  degree: string;
  location: string;
  yearsOfExperience: number;
  bio: string;
  skills: { skills: string[] };
  experience: ExperienceItem[];
  education: EducationItem[];
}
