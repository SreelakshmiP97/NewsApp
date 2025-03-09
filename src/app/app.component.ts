import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIconModule, MatButtonModule],
  template: `
    <header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <a href="/" class="logo">
            <div class="logo-icon">
              <mat-icon>newspaper</mat-icon>
            </div>
            <span class="logo-text">NewsApp</span>
          </a>
        </div>
        <nav class="nav-links">
          <a href="/" class="nav-link">Home</a>
          <a href="/categories" class="nav-link">Categories</a>
          <a href="/sources" class="nav-link">Sources</a>
          <a href="/bookmarks" class="nav-link">Bookmarks</a>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

    <footer class="app-footer">
      <div class="footer-content">
        <span>© 2024 NewsApp. All rights reserved.</span>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
      <div class="social-links">
        <a href="#"><mat-icon>facebook</mat-icon>Facebook</a>
        <a href="#"><mat-icon>twitter</mat-icon>Twitter</a>
        <a href="#"><mat-icon>linkedin</mat-icon>LinkedIn</a>
      </div>
    </footer>
  `,
  styles: [`
    .app-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--header-height);
      background-color: var(--primary-color);
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header-left {
      display: flex;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: white;
      gap: 0.5rem;
      margin-right: 2rem;
    }

    .logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }

    .logo:hover .logo-icon {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .logo-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }

    .nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .main-content {
      margin-top: var(--header-height);
      min-height: calc(100vh - var(--header-height));
      padding: 2rem;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }

    .app-footer {
      height: var(--footer-height);
      background-color: var(--primary-color);
      color: white;
      padding: 1rem;
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
    }

    .social-links {
      display: flex;
      gap: 1rem;
    }

    .social-links a {
      color: white;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: opacity 0.3s ease;
    }

    .social-links a:hover {
      opacity: 0.8;
    }

    .social-links mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        padding: 0.5rem;
      }

      .header-left {
        margin-bottom: 0.5rem;
      }

      .logo {
        margin-right: 0;
      }

      .nav-links {
        margin-top: 0.5rem;
        gap: 0.5rem;
      }

      .nav-link {
        padding: 0.25rem 0.5rem;
        font-size: 0.9rem;
      }

      .footer-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .social-links {
        justify-content: center;
      }
    }
  `]
})
export class AppComponent {
  title = 'newsapp';
}
