import { Component, inject } from '@angular/core';
import { FooterModalService } from '../../services/footer-modal-service';
import { FooterContentKey } from '../../types/FooterContentKey';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  imports: [],
})
export class Footer {
  // Inject modal service
  modal = inject(FooterModalService);

  // Footer sections with titles and links
  sections: {
    title: string;
    links: { label: string; contentKey: FooterContentKey }[];
  }[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', contentKey: 'features' },
        { label: 'How it works', contentKey: 'howItWorks' },
        { label: 'Pricing', contentKey: 'pricing' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', contentKey: 'about' },
        { label: 'Contact', contentKey: 'contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', contentKey: 'privacy' },
        { label: 'Terms', contentKey: 'terms' },
        { label: 'Security', contentKey: 'security' },
        { label: 'Cookies', contentKey: 'cookies' },
      ],
    },
  ];

  // Get the current year for the copyright
  currentYear = new Date().getFullYear();
}
