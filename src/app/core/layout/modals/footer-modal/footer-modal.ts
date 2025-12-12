import { Component, effect, inject, Renderer2 } from '@angular/core';
import { FooterModalService } from '../../../services/footer-modal-service';
import { Info, LucideAngularModule, X } from 'lucide-angular';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-footer-modal',
  imports: [LucideAngularModule, NgOptimizedImage],
  templateUrl: './footer-modal.html',
})
export class FooterModal {
  // State for controlling the visibility and type of the footer modal
  protected modal = inject(FooterModalService);
  private renderer = inject(Renderer2);

  // Effect to update modal content when contentKey changes
  private _contentKeyEffect = effect(() => {
    const contentKey = this.modal.contentKey();
    if (contentKey && this.modalContent[contentKey]) {
      const content = this.modalContent[contentKey];
      this.title = content.title;
      this.subtitle = content.subtitle;
      this.body = content.body;
    }
  });

  // Handle scrolling allowed or not
  constructor() {
    effect(() => {
      const isOpen = this.modal.isOpen();
      this.toggleBodyScroll(isOpen);
    });
  }

  // Toggle scrolling
  private toggleBodyScroll(enable: boolean) {
    const cls = 'overflow-hidden';
    enable
      ? this.renderer.addClass(document.body, cls)
      : this.renderer.removeClass(document.body, cls);
  }

  // Dynamic content for the modal
  title = '';
  subtitle = '';
  body = '';

  //
  modalContent = {
    features: {
      title: 'Our Core Features',
      subtitle: 'Unlock your full potential with our AI-driven tools.',
      body: 'ProfileVit[AI]e is engineered to be your ultimate career co-pilot, leveraging state-of-the-art AI to propel your professional journey. Our platform offers a comprehensive suite of features designed to give you a competitive edge. This includes an in-depth AI-powered profile analysis that goes beyond surface-level assessments to identify your core strengths and hidden talents. We provide personalized career roadmaps with step-by-step guidance, helping you navigate your career path with clarity and confidence. Discover curated job opportunities that perfectly match your unique skills and aspirations, and utilize our AI-driven portfolio-building suggestions to create a profile that captivates recruiters and showcases your true potential.',
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'A simple, four-step process to accelerate your career.',
      body: 'Getting started with ProfileVit[AI]e is a seamless and intuitive process designed to fast-track your career growth. First, create your professional profile by providing details about your work experience, skills, and educational background, and enrich it by uploading your portfolio. Second, our advanced AI engine performs a deep, multi-faceted analysis of your profile to understand your career trajectory, benchmark your skills against industry standards, and identify growth opportunities. Third, you will receive a personalized growth roadmap complete with actionable steps, tailored learning recommendations, and project suggestions. Finally, follow your custom-designed plan, enhance your portfolio with AI-guided improvements, and apply to relevant job opportunities with the confidence that you are a top-tier candidate.',
    },
    pricing: {
      title: 'Our Pricing Plans',
      subtitle: 'Choose the plan that’s right for you.',
      body: 'We offer a range of flexible pricing options designed to meet your specific needs and career goals. Our Free plan is the perfect way to get started, offering essential features like a basic profile setup, a preliminary AI-powered analysis, and access to a curated list of job opportunities. For professionals who are serious about accelerating their career growth, our Premium plan unlocks the full power of our platform. This includes advanced AI insights, fully personalized and dynamic roadmaps, AI-suggested portfolio projects tailored to your skill gaps, and priority support from our dedicated team, all for just $19 per month. We are committed to providing exceptional value and empowering your professional journey.',
    },
    about: {
      title: 'About Us',
      subtitle: 'The team behind your career growth.',
      body: 'We are a team of passionate developers from Riwi, and ProfileVit[AI]e is our final integration project. We are a collective of tech enthusiasts, career coaches, and AI experts, united by a common goal: to build a platform that empowers professionals to successfully navigate the complexities of the modern tech industry. Our mission is to democratize career development by providing the cutting-edge tools and actionable insights you need to achieve your goals, stay ahead of the curve, and thrive in a competitive and ever-evolving landscape.',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We’d love to hear from you.',
      body: 'Whether you have a question about our features, need support with your account, or simply want to provide feedback, our team is here and ready to help. You can reach us via email at support@profilevitaie.com, or connect with us on our various social media channels for the latest updates and news. You can also find our project on GitHub: https://github.com/Riwi-git/Profile-Vitaie. We are committed to providing you with the best possible experience and strive to respond to all inquiries within 24 hours.',
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Your data is safe with us.',
      body: 'At ProfileVit[AI]e, your privacy is a fundamental priority. This policy outlines our unwavering commitment to protecting your personal data and maintaining your trust. We provide a detailed breakdown of the information we collect, how it is used to power our personalized services, and the robust, multi-layered security measures we have in place to safeguard it. We believe in transparency and user control, which is why you have full authority over your data and how it is used. We are fully compliant with global privacy regulations, including GDPR, to ensure your information is handled with the utmost care and respect.',
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'The rules of the road.',
      body: 'By creating an account and using the ProfileVit[AI]e platform, you are agreeing to our Terms of Service. This legally binding agreement governs your use of our services and clearly outlines your rights and responsibilities as a user. It covers important aspects such as user conduct, intellectual property rights, and the conditions under which services may be terminated. We strongly encourage you to read it carefully to understand the legal framework of our relationship and to help us ensure a positive, productive, and fair experience for everyone in our community.',
    },
    security: {
      title: 'Our Security Commitment',
      subtitle: 'Protecting your professional identity.',
      body: 'We take the security of your data with the utmost seriousness. ProfileVit[AI]e implements enterprise-grade security protocols and best practices to protect your data from any unauthorized access, disclosure, alteration, or destruction. Our infrastructure is continuously monitored for threats, and we utilize end-to-end encryption, firewalls, and regular security audits to ensure your professional information remains confidential and secure at all times. Our team is trained in secure coding practices to prevent vulnerabilities and protect the integrity of our platform.',
    },
    cookies: {
      title: 'Cookie Policy',
      subtitle: 'How we enhance your experience.',
      body: 'Our platform uses cookies to deliver a seamless, personalized, and efficient user experience. This policy explains what cookies are, the different types of cookies we use (including essential, performance, and functional cookies), and why they are necessary for the platform to operate effectively. It also provides clear, step-by-step instructions on how you can manage your cookie preferences and control how your data is used. We are committed to transparency and giving you full control over your online experience.',
    },
  };

  // Lucide icon
  protected readonly X = X;
  protected readonly Info = Info;
}
