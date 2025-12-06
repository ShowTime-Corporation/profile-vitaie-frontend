import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/layout/navbar/navbar';
import { Footer } from './core/layout/footer/footer';
import { AuthModal } from './core/layout/modals/auth-modal/auth-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, AuthModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
