import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { NewsArticle } from '../../models/news.interface';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatRippleModule
  ],
  template: `
    <mat-card class="news-card mat-elevation-z1" matRipple>
      <div class="card-image-container">
        <img *ngIf="article.images?.[0]" [src]="article.images[0]" [alt]="article.title" class="card-image">
        <div *ngIf="!article.images?.[0]" class="placeholder-image">
          <mat-icon>image</mat-icon>
        </div>
        <div class="image-overlay">
          <div class="source-chip">
            <mat-icon>newspaper</mat-icon>
            {{ article.source }}
          </div>
          <div class="sentiment-chip" [class]="getSentimentClass()">
            <mat-icon>{{ getSentimentIcon() }}</mat-icon>
            <span>{{ getSentimentText() }}</span>
            <span class="score">({{ article.sentimentScore | number:'1.2-2' }})</span>
          </div>
        </div>
      </div>

      <mat-card-content>
        <div class="meta-info">
          <span class="topic">{{ article.topic }}</span>
          <span class="date">{{ formatDate(article.publishedAt) }}</span>
        </div>
        
        <h3 class="title">{{ article.title }}</h3>
        <p class="summary">{{ article.summary }}</p>
      </mat-card-content>

      <mat-card-actions>
        <a mat-button color="primary" [href]="article.url" target="_blank">
          READ MORE
          <mat-icon>arrow_forward</mat-icon>
        </a>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .news-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      border-radius: var(--border-radius-md);
      overflow: hidden;
      transition: transform 0.2s ease-in-out;
      background-color: var(--mat-card-background-color);
      border: none;

      &:hover {
        transform: translateY(-4px);
      }
    }

    .card-image-container {
      position: relative;
      width: 100%;
      height: 200px;
      overflow: hidden;
      background-color: var(--mat-card-subtitle-text-color);
    }

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .news-card:hover .card-image {
      transform: scale(1.05);
    }

    .placeholder-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--mat-card-subtitle-text-color);

      mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: var(--mat-card-text-color);
        opacity: 0.5;
      }
    }

    .image-overlay {
      position: absolute;
      top: var(--spacing-md);
      left: var(--spacing-md);
      right: var(--spacing-md);
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--spacing-sm);

      .source-chip {
        display: flex;
        align-items: center;
        gap: 6px;
        background-color: rgba(0, 0, 0, 0.75);
        color: white;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        backdrop-filter: blur(4px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

        mat-icon {
          font-size: 16px;
          width: 16px;
          height: 16px;
        }
      }

      .sentiment-chip {
        display: flex;
        align-items: center;
        gap: 6px;
        background-color: rgba(0, 0, 0, 0.75);
        color: white;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        backdrop-filter: blur(4px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

        &.positive {
          background-color: rgba(76, 175, 80, 0.9);
        }

        &.negative {
          background-color: rgba(244, 67, 54, 0.9);
        }

        &.neutral {
          background-color: rgba(158, 158, 158, 0.9);
        }

        mat-icon {
          font-size: 16px;
          width: 16px;
          height: 16px;
        }

        .score {
          font-size: 12px;
          opacity: 0.8;
        }
      }
    }

    mat-card-content {
      flex: 1;
      padding: var(--spacing-md);
    }

    .meta-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-sm);
      
      .topic {
        font-size: 14px;
        color: var(--mat-primary-color);
        font-weight: 500;
      }

      .date {
        font-size: 14px;
        color: var(--mat-card-subtitle-text-color);
      }
    }

    .title {
      font-size: 18px;
      font-weight: 500;
      line-height: 1.4;
      margin: 0 0 var(--spacing-sm);
      color: var(--mat-card-title-text-color);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .summary {
      font-size: 14px;
      line-height: 1.6;
      color: var(--mat-card-subtitle-text-color);
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    mat-card-actions {
      padding: var(--spacing-md);
      border-top: 1px solid var(--mat-card-divider-color);
      margin: 0;

      a {
        margin: 0;
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        font-weight: 500;
        letter-spacing: 0.5px;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
          margin: 0;
        }
      }
    }
  `]
})
export class NewsCardComponent {
  @Input() article!: NewsArticle;

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getSentimentClass(): string {
    const score = this.article.sentimentScore;
    if (score > 0.2) return 'positive';
    if (score < -0.2) return 'negative';
    return 'neutral';
  }

  getSentimentIcon(): string {
    const score = this.article.sentimentScore;
    if (score > 0.2) return 'sentiment_very_satisfied';
    if (score < -0.2) return 'sentiment_very_dissatisfied';
    return 'sentiment_neutral';
  }

  getSentimentText(): string {
    const score = this.article.sentimentScore;
    if (score > 0.2) return 'Positive';
    if (score < -0.2) return 'Negative';
    return 'Neutral';
  }
}
