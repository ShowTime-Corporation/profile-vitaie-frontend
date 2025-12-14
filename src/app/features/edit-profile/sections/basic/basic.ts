import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookOpen, Briefcase, LucideAngularModule, MapPin, User } from 'lucide-angular';

@Component({
  selector: 'app-basic',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './basic.html',
})
export class Basic {
  // Inject current basic form
  @Input() basicForm!: FormGroup;

  // Lucide Icons
  protected readonly User = User;
  protected readonly BookOpen = BookOpen;
  protected readonly MapPin = MapPin;
  protected readonly Briefcase = Briefcase;
}
