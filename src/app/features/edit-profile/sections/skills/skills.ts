import { Component, Input, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { LucideAngularModule, Plus, X } from 'lucide-angular';
import { ToastService } from '../../../../core/services/toast-service';

// Helper function to convert string to Title Case
export const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
};

@Component({
  selector: 'app-skills',
  imports: [ReactiveFormsModule, LucideAngularModule, FormsModule],
  templateUrl: './skills.html',
})
export class Skills {
  // Inject current skills
  @Input() skillsFormArray!: FormArray;

  // Inject needed services
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  // Add a FormControl for the new skill input
  newSkillControl = new FormControl('', Validators.required);

  // Lucide icons
  protected readonly Plus = Plus;
  protected readonly X = X;

  // Add a new skill
  addSkill() {
    const trimmedValue = this.newSkillControl.value?.trim();

    if (!trimmedValue) {
      this.toastService.show('Skill cannot be empty', 'error');
      this.newSkillControl.reset();
      return;
    }

    // Get the value from the input and apply Title Case
    const value = toTitleCase(trimmedValue);

    // Check if the skill already exists
    if (this.skillsFormArray.value.includes(value)) {
      this.toastService.show('Skill already exists', 'error');
      this.newSkillControl.reset();
      return;
    }

    // Add skill to the form array
    this.skillsFormArray.push(this.fb.control(value, Validators.required));
    this.newSkillControl.reset();
    this.toastService.show('Skill added successfully');
  }

  // Remove selected skill
  removeSkill(index: number) {
    this.skillsFormArray.removeAt(index);
    this.toastService.show('Skill removed successfully');
  }
}
