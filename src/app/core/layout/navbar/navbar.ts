import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { AuthModalService } from '../../services/auth-modal-service';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';
import { SlicePipe, UpperCasePipe } from '@angular/common';
import { Crown, LogOut, LucideAngularModule, Settings, User } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, UpperCasePipe, SlicePipe, LucideAngularModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  // Inject auth modal service
  protected modal = inject(AuthModalService);
  // Inject auth service
  protected auth = inject(AuthService);
  private elementRef = inject(ElementRef);

  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  protected readonly User = User;
  protected readonly LogOut = LogOut;
  protected readonly Crown = Crown;
  protected readonly Settings = Settings;
  protected readonly RouterLink = RouterLink;
}
