import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { EducationItem } from '../interfaces/education-item';
import { ExperienceItem } from '../interfaces/experience-item';

export type AddItemType = 'education' | 'experience' | null;

@Injectable({
  providedIn: 'root',
})
export class AddItemModalService {
  // State for controlling the visibility and type of the add item modal
  private _isOpen = signal(false);
  private _isClosing = signal(false);
  private _itemType = signal<AddItemType>(null);
  private _itemToEdit = signal<EducationItem | ExperienceItem | null>(null); // Can now be EducationItem or ExperienceItem
  private _editingIndex = signal<number | null>(null);

  private educationItemSource = new Subject<EducationItem>();
  educationItem$ = this.educationItemSource.asObservable();

  private updatedEducationItemSource = new Subject<{ item: EducationItem; index: number }>();
  updatedEducationItem$ = this.updatedEducationItemSource.asObservable();

  private experienceItemSource = new Subject<ExperienceItem>(); // New subject for experience items
  experienceItem$ = this.experienceItemSource.asObservable();

  private updatedExperienceItemSource = new Subject<{ item: ExperienceItem; index: number }>(); // New subject for updated experience items
  updatedExperienceItem$ = this.updatedExperienceItemSource.asObservable();

  // Exposing the state as read-only signals
  isOpen = this._isOpen.asReadonly();
  isClosing = this._isClosing.asReadonly();
  itemType = this._itemType.asReadonly();
  itemToEdit = this._itemToEdit.asReadonly();
  editingIndex = this._editingIndex.asReadonly();

  // Open the modal with a specific item type (education or experience)
  open(type: AddItemType, item?: EducationItem | ExperienceItem, index?: number) {
    this._itemType.set(type);
    if (item) {
      this._itemToEdit.set(item);
    } else {
      this._itemToEdit.set(null);
    }
    if (index !== undefined) {
      this._editingIndex.set(index);
    } else {
      this._editingIndex.set(null);
    }
    this._isOpen.set(true);
    this._isClosing.set(false);
  }

  // Close the modal
  close() {
    this._isClosing.set(true);

    setTimeout(() => {
      this._isOpen.set(false);
      this._isClosing.set(false);
      this._itemType.set(null);
      this._itemToEdit.set(null);
      this._editingIndex.set(null);
    }, 250);
  }

  addEducationItem(item: EducationItem) {
    this.educationItemSource.next(item);
  }

  updateEducationItem(item: EducationItem, index: number) {
    this.updatedEducationItemSource.next({ item, index });
  }

  addExperienceItem(item: ExperienceItem) {
    // New method to add experience item
    this.experienceItemSource.next(item);
  }

  updateExperienceItem(item: ExperienceItem, index: number) {
    // New method to update experience item
    this.updatedExperienceItemSource.next({ item, index });
  }
}
