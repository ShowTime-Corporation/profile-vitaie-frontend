import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ProfileService } from '../../../core/services/profile-service';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../core/interfaces/user-profile';
import { Basic } from '../sections/basic/basic';
import { Skills } from '../sections/skills/skills';
import { Experience } from '../sections/experience/experience';
import { Education } from '../sections/education/education';
import { Links } from '../sections/links/links';
import { AsyncPipe } from '@angular/common';
import { AddItemModalService } from '../services/add-item-modal.service';
import { EducationItem } from '../interfaces/education-item';
import { ExperienceItem } from '../interfaces/experience-item';
import { UserProfileRequestDTO } from '../interfaces/user-profile-request-dto';
import { ToastService } from '../../../core/services/toast-service';
import { AddItemModal } from '../modals/add-item-modal/add-item-modal';

@Component({
  selector: 'app-edit-profile-page',
  imports: [
    LucideAngularModule,
    ReactiveFormsModule,
    Basic,
    Skills,
    Experience,
    Education,
    Links,
    AsyncPipe,
    AddItemModal,
  ],
  templateUrl: './edit-profile-page.html',
})
export class EditProfilePage implements OnInit {
  // Inject services
  profileService = inject(ProfileService);
  fb = inject(FormBuilder);
  addItemModal = inject(AddItemModalService);
  toastService = inject(ToastService);

  // Observable to hold the user profile data
  userProfile$!: Observable<UserProfile>;

  // FormGroup for the entire update profile form
  updateForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    degree: ['', Validators.required],
    location: ['', Validators.required],
    yearsOfExperience: [0, [Validators.required, Validators.min(0)]],
    bio: ['', Validators.required],
    skills: this.fb.array([]),
    education: this.fb.array([]),
    experience: this.fb.array([]),
    links: this.fb.group({
      github: [
        '',
        [Validators.pattern('^(https?:\\/\\/)?(www\\.)?github\\.com\\/[a-zA-Z0-9_-]+$')],
      ],
      portfolio: [
        '',
        [Validators.pattern('^(https?:\\/\\/)?(www\\.)?[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}(\\/\\S*)?$')],
      ],
      linkedin: [
        '',
        [
          Validators.pattern(
            '^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/(in|pub)\\/[a-zA-Z0-9_-]+(\\/)?$',
          ),
        ],
      ],
      cv: [null as File | null],
    }),
  });

  // Lifecycle hook that has initialized all data-bound properties
  ngOnInit(): void {
    // Get user profile data
    this.userProfile$ = this.profileService.getUserProfile();

    // Subscribe to user profile changes
    this.userProfile$.subscribe((profile) => {
      if (profile) {
        // Patch the main form with basic profile information
        this.updateForm.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          degree: profile.degree,
          location: profile.location,
          yearsOfExperience: profile.yearsOfExperience,
          bio: profile.bio,
        });
        // Clear existing skills and add new ones from the profile
        this.skillsFormArray.clear();
        if (profile.skills) {
          profile.skills.skills.forEach((skill) =>
            this.skillsFormArray.push(this.fb.control(skill)),
          );
        }
        // Patch links form group if data exists
        if (profile.links) {
          this.linksForm.patchValue({
            github: profile.links.github,
            portfolio: profile.links.portfolio,
          });
        }

        // Clear existing education items and add new ones from the profile
        this.educationFormArray.clear();
        if (profile.education) {
          profile.education.forEach((item) =>
            this.educationFormArray.push(this.createEducationFormGroup(item)),
          );
        }

        // Clear existing experience items and add new ones from the profile
        this.experienceFormArray.clear();
        if (profile.experience) {
          profile.experience.forEach((item) =>
            this.experienceFormArray.push(this.createExperienceFormGroup(item)),
          );
        }
      }
    });

    // Subscribe to new education items from the modal service
    this.addItemModal.educationItem$.subscribe((item: EducationItem) => {
      this.educationFormArray.push(this.createEducationFormGroup(item));
    });

    // Subscribe to updated education items from the modal service
    this.addItemModal.updatedEducationItem$.subscribe(({ item, index }) => {
      if (index !== null && index >= 0 && index < this.educationFormArray.length) {
        this.educationFormArray.at(index).patchValue(item);
      }
    });

    // Subscribe to new experience items from the modal service
    this.addItemModal.experienceItem$.subscribe((item: ExperienceItem) => {
      this.experienceFormArray.push(this.createExperienceFormGroup(item));
    });

    // Subscribe to updated experience items from the modal service
    this.addItemModal.updatedExperienceItem$.subscribe(({ item, index }) => {
      if (index !== null && index >= 0 && index < this.experienceFormArray.length) {
        this.experienceFormArray.at(index).patchValue(item);
      }
    });
  }

  // Creates a FormGroup for an education item
  createEducationFormGroup(item: EducationItem): FormGroup {
    return this.fb.group({
      degree: [item.degree, Validators.required],
      institution: [item.institution, Validators.required],
      graduationYear: [item.graduationYear, Validators.required],
    });
  }

  // Creates a FormGroup for an experience item
  createExperienceFormGroup(item: ExperienceItem): FormGroup {
    return this.fb.group({
      role: [item.role, Validators.required],
      company: [item.company, Validators.required],
      startDate: [item.startDate, Validators.required],
      endDate: [item.endDate, Validators.required],
      description: [item.description, Validators.required],
    });
  }

  // Getter for the skills FormArray
  get skillsFormArray() {
    return this.updateForm.get('skills') as FormArray;
  }

  // Getter for the education FormArray
  get educationFormArray() {
    return this.updateForm.get('education') as FormArray;
  }

  // Getter for the experience FormArray
  get experienceFormArray() {
    return this.updateForm.get('experience') as FormArray;
  }

  // Getter for the links FormGroup
  get linksForm() {
    return this.updateForm.get('links') as FormGroup;
  }

  // Handles the form submission for updating the profile
  onSubmitUpdate() {
    // Check if the form is invalid
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      this.toastService.show('Please fill in all required fields', 'error');
      return;
    }

    // Get the raw form values
    const formValue = this.updateForm.getRawValue();

    // Extract CV file and remove it from links payload
    const cvFile: File | null = formValue.links.cv ?? null;

    // Construct the payload for the profile update request
    const payload: UserProfileRequestDTO = {
      firstName: formValue.firstName!,
      lastName: formValue.lastName!,
      degree: formValue.degree!,
      location: formValue.location!,
      yearsOfExperience: formValue.yearsOfExperience!,
      bio: formValue.bio!,
      skills: {
        skills: (formValue.skills ?? []) as string[],
      },
      // Map experience FormArray values to the DTO format
      experience: this.experienceFormArray.value.map((item: any) => ({
        role: item.role,
        company: item.company,
        startDate: item.startDate,
        endDate: item.endDate ?? null,
        current: !item.endDate,
      })),
      // Map education FormArray values to the DTO format
      education: this.educationFormArray.value.map((item: any) => ({
        degree: item.degree,
        institution: item.institution,
        graduationYear: item.graduationYear,
      })),
      // Map links FormGroup values to the DTO format
      links: {
        github: formValue.links.github ?? null,
        portfolio: formValue.links.portfolio ?? null,
        linkedin: formValue.links.linkedin ?? null,
      },
    };

    // Call the profile service to update profile data
    this.profileService.updateProfile(payload).subscribe({
      next: () => {
        // Show success toast message
        this.toastService.show('Profile updated successfully', 'success');
        // Upload CV only if present
        if (cvFile) {
          const formData = new FormData();
          formData.append('file', cvFile);

          // Call the profile service to upload the CV
          this.profileService.uploadCv(formData).subscribe({
            next: () => {
              // Handle success
            },
            error: (err) => {
              console.error('Error uploading CV', err);
              // Handle error
            },
          });
        }
      },
      error: (err) => {
        console.error('Error updating profile', err);
      },
    });
  }
}
