import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Link, Upload, Trash } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-links',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './links.html',
})
export class Links {
  // Inject current experience items
  @Input() linksForm!: FormGroup;

  // Lucide icons
  protected readonly Link = Link;
  protected readonly Upload = Upload;
  protected readonly Trash = Trash;

  // File name for displaying
  fileName: string | null = null;

  // Upload file
  onFileSelected(event: Event) {
    // Cast the event target to an HTMLInputElement
    const input = event.target as HTMLInputElement;

    // Check if files were selected
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedTypes = ['application/pdf'];

      // Check if the selected file type is allowed
      if (allowedTypes.includes(file.type)) {
        this.linksForm.patchValue({ cv: file });
        this.linksForm.get('cv')?.setErrors(null);
        this.fileName = file.name;
      } else {
        // Set a validation error for invalid file type
        this.linksForm.get('cv')?.setErrors({ invalidFileType: true });
        this.linksForm.patchValue({ cv: null });
        this.fileName = null;
      }
    } else {
      // Reset the form control value if no file is selected
      this.linksForm.patchValue({ cv: null });
      this.fileName = null;
    }

    // Mark the form control as touched to trigger validation messages
    this.linksForm.get('cv')?.markAsTouched();
  }

  // Removes the selected file.
  removeFile() {
    this.linksForm.patchValue({ cv: null });
    this.fileName = null;
  }
}
