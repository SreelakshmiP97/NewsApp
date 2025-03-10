import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NewsFilterComponent } from './components/news-filter/news-filter.component';
import { NewsFilter } from './models/news.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NewsFilterComponent
  ],
  template: `
    <div class="app-container">
      <mat-toolbar class="app-header">
        <div class="header-content">
          <div class="logo-section">
            <button mat-icon-button class="menu-button" (click)="sidenav.toggle()">
              <mat-icon>menu</mat-icon>
            </button>
            <a routerLink="/" class="logo-link">
              <div class="logo-container">
                <mat-icon class="logo-icon">article</mat-icon>
                <span class="logo-text">NewsApp</span>
              </div>
            </a>
          </div>
          <nav class="nav-links">
            <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              <mat-icon>home</mat-icon>
              Home
            </a>
            <a mat-button routerLink="/categories" routerLinkActive="active">
              <mat-icon>category</mat-icon>
              Categories
            </a>
            <a mat-button routerLink="/sources" routerLinkActive="active">
              <mat-icon>source</mat-icon>
              Sources
            </a>
            <a mat-button routerLink="/bookmarks" routerLinkActive="active">
              <mat-icon>bookmarks</mat-icon>
              Bookmarks
            </a>
          </nav>
        </div>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="over" class="app-sidenav" [autoFocus]="false">
          <mat-nav-list>
            <a mat-list-item routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="sidenav.close()">
              <mat-icon matListItemIcon>home</mat-icon>
              <span matListItemTitle>Home</span>
            </a>
            <a mat-list-item routerLink="/categories" routerLinkActive="active" (click)="sidenav.close()">
              <mat-icon matListItemIcon>category</mat-icon>
              <span matListItemTitle>Categories</span>
            </a>
            <a mat-list-item routerLink="/sources" routerLinkActive="active" (click)="sidenav.close()">
              <mat-icon matListItemIcon>source</mat-icon>
              <span matListItemTitle>Sources</span>
            </a>
            <a mat-list-item routerLink="/bookmarks" routerLinkActive="active" (click)="sidenav.close()">
              <mat-icon matListItemIcon>bookmarks</mat-icon>
              <span matListItemTitle>Bookmarks</span>
            </a>
          </mat-nav-list>

          <mat-divider></mat-divider>

        </mat-sidenav>

        <mat-sidenav-content>
          <main class="main-content">
            <router-outlet></router-outlet>
          </main>
        </mat-sidenav-content>
      </mat-sidenav-container>

      <footer class="app-footer">
        <div class="footer-content">
          <span>© 2024 NewsApp. All rights reserved.</span>
          <div class="footer-links">
            <a mat-button href="/privacy">Privacy Policy</a>
            <a mat-button href="/terms">Terms of Service</a>
          </div>
          <div class="social-links">
            <a mat-icon-button href="#" aria-label="Facebook">
              <mat-icon>facebook</mat-icon>
            </a>
            <a mat-icon-button href="#" aria-label="Twitter">
              <mat-icon>twitter</mat-icon>
            </a>
            <a mat-icon-button href="#" aria-label="LinkedIn">
              <mat-icon>linkedin</mat-icon>
            </a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .app-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: white !important;
      color: white !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      ::ng-deep .mat-mdc-icon-button {
        --mdc-icon-button-icon-color: white;
        color: white !important;
      }

      ::ng-deep .mdc-icon-button {
        color: white !important;
      }
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
      height: 64px;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .menu-button {
      display: none;
      color: white !important;
      margin-right: 8px;

      mat-icon {
        color: black !important;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .logo-link {
      text-decoration: none;
      color: white;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #212121;
    }

    .logo-text {
      font-size: 24px;
      font-weight: 500;
      letter-spacing: 0.5px;
      color: #212121;
    }

    .nav-links {
      display: flex;
      gap: 8px;
      align-items: center;

      a {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
       color: #212121;
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 8px;
        transition: all 0.2s ease-in-out;
        
        mat-icon {
         color: #212121;
          margin-right: 4px;
          transition: all 0.2s ease-in-out;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        &.active {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }

    .sidenav-container {
      flex: 1;
      margin-top: 64px;
      background-color: #ffffff;
    }

    .app-sidenav {
      width: 280px;
      background-color: #ffffff !important;
      border-right: 1px solid rgba(0, 0, 0, 0.12);

      ::ng-deep .mat-drawer-inner-container {
        background-color: #ffffff;
      }
    }

    mat-nav-list {
      padding: 16px;

      a {
        border-radius: 8px;
        margin-bottom: 8px;
        color: rgba(0, 0, 0, 0.87);

        mat-icon {
          color: rgba(0, 0, 0, 0.54);
          margin-right: 16px;
        }

        &:hover {
          background-color: rgba(var(--mat-primary-color-rgb), 0.04);
          color: var(--mat-primary-color);

          mat-icon {
            color: var(--mat-primary-color);
          }
        }

        &.active {
          color: var(--mat-primary-color);
          background-color: rgba(var(--mat-primary-color-rgb), 0.12);

          mat-icon {
            color: var(--mat-primary-color);
          }
        }
      }
    }

    .main-content {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
    }

    .app-footer {
      background-color: #ffffff;
      color: rgba(0, 0, 0, 0.87);
      padding: 24px 0;
      margin-top: auto;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-links {
      display: flex;
      gap: 16px;

      a {
        color: rgba(0, 0, 0, 0.87);
        text-decoration: none;
        transition: color 0.2s ease-in-out;

        &:hover {
          color: var(--mat-primary-color);
        }
      }
    }

    .social-links {
      display: flex;
      gap: 8px;

      a {
        color: rgba(0, 0, 0, 0.54);
        transition: all 0.2s ease-in-out;

        &:hover {
          color: var(--mat-primary-color);
          transform: translateY(-2px);
        }
      }
    }

    .filter-container {
      padding: 16px;
    }

    @media (max-width: 768px) {
      .menu-button {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .nav-links {
        display: none;
      }

      .logo-text {
        font-size: 20px;
      }

      .footer-content {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }

      .footer-links {
        flex-direction: column;
        gap: 8px;
      }
    }
  `]
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  onFilterChange(filter: NewsFilter) {
    console.log('Filter changed:', filter);
    // TODO: Implement filter logic in your news service
  }
}
