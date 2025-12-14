import { Component, inject, Input } from '@angular/core';
import { Briefcase, LucideAngularModule, Plus, SquarePen, Trash } from 'lucide-angular';
import { AddItemModalService } from '../../services/add-item-modal.service';
import { ToastService } from '../../../../core/services/toast-service';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-experience',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './experience.html',
})
export class Experience {
  // Inject current experience items
  @Input() experienceFormArray!: FormArray<FormGroup>;

  // Inject services
  private addItemModalService = inject(AddItemModalService);
  private toastService = inject(ToastService);

  // Lucide icons
  protected readonly Plus = Plus;
  protected readonly Briefcase = Briefcase;
  protected readonly Trash = Trash;
  protected readonly SquarePen = SquarePen;

  // Open add item modal as experience
  openAddItemModal() {
    this.addItemModalService.open('experience');
  }

  // Edit experience item
  editExperienceItem(item: FormGroup, index: number) {
    // Open modal filled with existing item data
    this.addItemModalService.open('experience', item.value, index);
  }

  // Delete experience item
  deleteExperienceItem(index: number) {
    this.experienceFormArray.removeAt(index);
    this.toastService.show('Experience item deleted successfully');
  }
}
