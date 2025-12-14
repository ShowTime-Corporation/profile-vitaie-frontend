export interface ExperienceItem {
  role: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  description: string;
  current?: boolean;
}
