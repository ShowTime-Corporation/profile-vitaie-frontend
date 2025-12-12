import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/layout/navbar/navbar';
import { Footer } from './core/layout/footer/footer';
import { AuthModal } from './core/layout/modals/auth-modal/auth-modal';
import { FooterModal } from './core/layout/modals/footer-modal/footer-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, AuthModal, FooterModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
