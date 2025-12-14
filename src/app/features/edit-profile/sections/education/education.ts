import { Component, inject, Input } from '@angular/core';
import { AddItemModalService } from '../../services/add-item-modal.service';
import { LucideAngularModule, Plus, School, SquarePen, Trash } from 'lucide-angular';
import { ToastService } from '../../../../core/services/toast-service';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-education',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './education.html',
})
export class Education {
  // Inject current experience items
  @Input() educationFormArray!: FormArray<FormGroup>;

  // Inject services
  private addItemModalService = inject(AddItemModalService);
  private toastService = inject(ToastService);

  // Lucide icons
  protected readonly Plus = Plus;
  protected readonly School = School;
  protected readonly Trash = Trash;
  protected readonly SquarePen = SquarePen;

  // Open add item modal as education
  openAddItemModal() {
    this.addItemModalService.open('education');
  }

  // Edit experience item
  editEducationItem(item: FormGroup, index: number) {
    // Open modal filled with existing item data
    this.addItemModalService.open('education', item.value, index);
  }

  // Delete education item
  deleteEducationItem(index: number) {
    this.educationFormArray.removeAt(index);
    this.toastService.show('Education item deleted successfully');
  }
}
