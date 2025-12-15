import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Link, LucideAngularModule, Trash, Upload, X } from 'lucide-angular';
import { UserProfile } from '../../../interfaces/user-profile';
import { CvModalService } from '../../../services/cv-modal-service';
import { ProfileService } from '../../../services/profile-service';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-cv-modal',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule, NgClass, NgOptimizedImage],
  templateUrl: './cv-modal.html',
})
export class CvModal {
  // Input to receive user profile data
  @Input() userProfile: UserProfile | null = null;

  // Injected services
  cvModalService = inject(CvModalService);
  profileService = inject(ProfileService);
  fb = inject(FormBuilder);

  // Cv form
  uploadCvForm: FormGroup;

  // Signals for managing file upload state
  fileName = signal<string | null>(null);
  isUploading = signal(false);

  // Lucide Icons
  protected readonly Upload = Upload;
  protected readonly Link = Link;
  protected readonly Trash = Trash;
  protected readonly X = X;

  constructor() {
    this.uploadCvForm = this.fb.group({
      cv: [null],
    });
  }

  // Close the modal
  close() {
    this.cvModalService.close();
  }

  // Handle file selection from input
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    // Check if files are selected
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedTypes = ['application/pdf'];
      const maxSize = 10 * 1024 * 1024; // 10 MB

      // Check if the file type is allowed
      if (!allowedTypes.includes(file.type)) {
        this.uploadCvForm.get('cv')?.setErrors({ invalidFileType: true });
        this.fileName.set(null);
      } else if (file.size > maxSize) {
        // Check if the file size exceeds the maximum size
        this.uploadCvForm.get('cv')?.setErrors({ fileTooLarge: true });
        this.fileName.set(null);
      } else {
        // If the file is valid, patch the form value and set the file name
        this.uploadCvForm.patchValue({ cv: file });
        this.uploadCvForm.get('cv')?.setErrors(null);
        this.fileName.set(file.name);
      }
    } else {
      // If no file is selected, reset the form value and file name
      this.uploadCvForm.patchValue({ cv: null });
      this.fileName.set(null);
    }

    this.uploadCvForm.get('cv')?.markAsTouched();
  }

  // Remove selected file
  removeFile() {
    this.uploadCvForm.patchValue({ cv: null });
    this.fileName.set(null);
  }

  // Upload CV to backend
  uploadCv() {
    // Get the cv control from the form
    const control = this.uploadCvForm.get('cv');

    // If the control is invalid or has no value, mark it as touched and return
    if (!control || !control.value) {
      control?.markAsTouched();
      return;
    }

    // Create a new FormData object and append the file
    const file = control.value as File;
    const formData = new FormData();
    formData.append('cv', file, file.name);

    // Set the uploading signal to true
    this.isUploading.set(true);

    // Call the profile service to upload the CV
    this.profileService.uploadCv(formData).subscribe({
      next: () => {
        // On success, set the uploading signal to false and close the modal
        this.isUploading.set(false);
        this.cvModalService.close();
      },
      error: () => {
        // On error, set the uploading signal to false
        this.isUploading.set(false);
      },
    });
  }
}
