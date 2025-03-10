import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NewsCardComponent } from '../news-card/news-card.component';
import { BookmarkService } from '../../services/bookmark.service';
import { NewsArticle } from '../../models/news.interface';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, MatIconModule, NewsCardComponent],
  template: `
    <div class="bookmarks-container">
      <div class="bookmarks-header">
        <h1>
          <mat-icon>bookmarks</mat-icon>
          Bookmarked Articles
        </h1>
        <p *ngIf="bookmarkedArticles.length === 0" class="no-bookmarks">
          No bookmarked articles yet. Start bookmarking articles you want to read later!
        </p>
      </div>

      <div class="bookmarks-grid">
        <app-news-card
          *ngFor="let article of bookmarkedArticles"
          [article]="article"
        ></app-news-card>
      </div>
    </div>
  `,
  styles: [`
    .bookmarks-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .bookmarks-header {
      margin-bottom: 32px;
      
      h1 {
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--mat-primary-color);
        margin: 0 0 16px;

        mat-icon {
          font-size: 32px;
          width: 32px;
          height: 32px;
        }
      }
    }

    .no-bookmarks {
      color: var(--mat-card-subtitle-text-color);
      font-size: 16px;
      text-align: center;
      padding: 48px;
      background: var(--mat-card-background-color);
      border-radius: 8px;
      border: 2px dashed var(--mat-card-subtitle-text-color);
    }

    .bookmarks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }

    @media (max-width: 768px) {
      .bookmarks-container {
        padding: 16px;
      }

      .bookmarks-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BookmarksComponent implements OnInit {
  bookmarkedArticles: NewsArticle[] = [];

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarkService.getBookmarks().subscribe(articles => {
      this.bookmarkedArticles = articles;
    });
  }
} 