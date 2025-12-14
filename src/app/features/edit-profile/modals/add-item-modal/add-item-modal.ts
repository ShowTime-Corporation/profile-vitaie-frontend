import { Component, inject, effect } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { ArrowRight, LucideAngularModule, X } from 'lucide-angular';
import { AddItemModalService } from '../../services/add-item-modal.service';
import { EducationItem } from '../../interfaces/education-item';
import { ExperienceItem } from '../../interfaces/experience-item';
import { ToastService } from '../../../../core/services/toast-service';

// Custom validator function
function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  // Get the start and end dates from the form
  const startDate = control.get('startDate')?.value;
  const endDate = control.get('endDate')?.value;

  // Check if start date is after end date
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    return { dateRange: true };
  }
  return null;
}

@Component({
  selector: 'app-add-item-modal',
  imports: [ReactiveFormsModule, NgClass, LucideAngularModule],
  templateUrl: './add-item-modal.html',
})
export class AddItemModal {
  // Inject services
  protected modal = inject(AddItemModalService);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  // Lucide icons
  protected readonly ArrowRight = ArrowRight;
  protected readonly X = X;

  // Education form
  educationForm = this.fb.group({
    degree: ['', Validators.required],
    institution: ['', Validators.required],
    graduationYear: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
  });

  // Experience form
  experienceForm = this.fb.group(
    {
      role: ['', Validators.required],
      company: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['', Validators.required],
    },
    { validators: dateRangeValidator },
  );

  // Effect to update form when itemToEdit changes
  constructor() {
    effect(() => {
      // Get the item and item type from the modal service
      const item = this.modal.itemToEdit();
      const itemType = this.modal.itemType();

      // If there's an item to edit, populate the corresponding form
      if (item && itemType === 'education') {
        // Cast the item to the correct type
        const educationItem = item as EducationItem;

        // Populate the education form
        this.educationForm.patchValue({
          degree: educationItem.degree,
          institution: educationItem.institution,
          graduationYear: educationItem.graduationYear,
        });
      } else if (item && itemType === 'experience') {
        // Populate the experience form
        this.experienceForm.patchValue(item as ExperienceItem);
      } else {
        // Reset forms when no item is being edited
        this.educationForm.reset();
        this.experienceForm.reset();
      }
    });
  }

  // Education form submission
  onSubmitEducation() {
    // Check if the form is valid
    if (!this.educationForm.valid) {
      this.educationForm.markAllAsTouched();
      return;
    }

    // Extract form values
    const { degree, institution, graduationYear } = this.educationForm.value;

    // Create the submitted item
    const submittedItem: EducationItem = {
      degree: degree!,
      institution: institution!,
      graduationYear: graduationYear!, // string
    };

    // Determine whether to add or update based on editingIndex
    const editingIndex = this.modal.editingIndex();
    if (editingIndex !== null) {
      this.modal.updateEducationItem(submittedItem, editingIndex);
      this.toastService.show('Education item updated successfully');
    } else {
      this.modal.addEducationItem(submittedItem);
      this.toastService.show('Education item added successfully');
    }

    // Close the modal
    this.modal.close();
  }

  // Experience form submission
  onSubmitExperience() {
    // Check if the form is valid
    if (!this.experienceForm.valid) {
      this.experienceForm.markAllAsTouched();
      return;
    }

    // Extract form values
    const { role, company, startDate, endDate, description } = this.experienceForm.value;

    // Create the submitted item
    const submittedItem: ExperienceItem = {
      role: role!,
      company: company!,
      startDate: startDate!,
      endDate: endDate || null, // explicit, intentional
      description: description!,
    };

    // Determine whether to add or update based on editingIndex
    const editingIndex = this.modal.editingIndex();
    if (editingIndex !== null) {
      this.modal.updateExperienceItem(submittedItem, editingIndex);
      this.toastService.show('Experience item updated successfully');
    } else {
      this.modal.addExperienceItem(submittedItem);
      this.toastService.show('Experience item added successfully');
    }

    // Close the modal
    this.toastService.show('Experience item added successfully');
    this.modal.close();
  }
}
