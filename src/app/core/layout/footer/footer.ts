import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  imports: [],
})
export class Footer {
  // Footer sections with titles and links
  sections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', url: '#features' },
        { label: 'How it works', url: '#how-it-works' },
        { label: 'Pricing', url: '#pricing' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', url: '/about' },
        { label: 'Contact', url: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', url: '/privacy' },
        { label: 'Terms', url: '/terms' },
        { label: 'Security', url: '/security' },
        { label: 'Cookies', url: '/cookies' },
      ],
    },
  ];

  // Get the current year for the copyright
  currentYear = new Date().getFullYear();
}
