import { Component, effect, inject } from '@angular/core';
import { Crown, Edit, LucideAngularModule, Mail, User } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-page',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './edit-profile-page.html',
})
export class EditProfilePage {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  user = this.authService.currentUser;

  // Update form
  updateForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  // Set user's info on form
  constructor() {
    effect(() => {
      const currentUser = this.user();
      if (currentUser) {
        this.updateForm.patchValue({
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        });
      }
    });
  }

  // On submit
  onSubmitUpdate() {}

  protected readonly Mail = Mail;
  protected readonly Crown = Crown;
  protected readonly User = User;
  protected readonly Edit = Edit;
}
