import { Component, inject } from '@angular/core';
import { AuthModalService } from '../../services/auth-modal-service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
})
export class Navbar {
  // Inject auth modal service
  protected modal = inject(AuthModalService);
}
