import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Article } from '../../models/article';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-card class="news-card">
      <div class="card-image-container">
        <div class="image-placeholder" *ngIf="!hasValidImage">
          <mat-icon>image</mat-icon>
          <span>No image available</span>
        </div>
        <img 
          *ngIf="hasValidImage"
          [src]="imageUrl" 
          [alt]="article.title" 
          class="card-image"
          (error)="handleImageError()"
          loading="lazy"
        >
        <div class="image-overlay">
          <span class="source-badge">{{ article.source }}</span>
        </div>
      </div>

      <mat-card-content>
        <div class="card-meta">
          <span class="topic-chip">{{ article.topic }}</span>
          <span class="date">{{ formatDate(article.publishedAt) }}</span>
        </div>
        
        <h2 class="card-title">{{ article.title }}</h2>
        <p class="card-summary">{{ article.summary }}</p>

        <div class="sentiment-indicator" [ngClass]="getSentimentClass(article.sentimentScore)">
          <mat-icon>{{ getSentimentIcon(article.sentimentScore) }}</mat-icon>
          <span>{{ getSentimentText(article.sentimentScore) }}</span>
        </div>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button color="primary" (click)="openArticle(article.url)">
          READ MORE
          <mat-icon>arrow_forward</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      overflow: hidden;
    }

    .news-card {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      margin: 0;
      box-sizing: border-box;
      max-width: 100%;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }
    }

    .card-image-container {
      position: relative;
      width: 100%;
      height: 200px;
      overflow: hidden;
      background-color: #f0f0f0;
      flex-shrink: 0;
    }

    .image-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      color: #999;

      mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        margin-bottom: 8px;
      }

      span {
        font-size: 14px;
      }
    }

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      display: block;
    }

    .news-card:hover .card-image {
      transform: scale(1.05);
    }

    .image-overlay {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 1;
    }

    .source-badge {
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
      max-width: calc(100% - 32px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    mat-card-content {
      flex: 1 1 auto;
      padding: 16px;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      min-height: 0;
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      width: 100%;
      gap: 8px;
    }

    .topic-chip {
      background-color: var(--primary-color);
      color: white;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
      flex-shrink: 1;
    }

    .date {
      color: var(--text-secondary);
      font-size: 12px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .card-title {
      margin: 0 0 12px 0;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.4;
      color: var(--text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      width: 100%;
    }

    .card-summary {
      margin: 0 0 16px 0;
      font-size: 14px;
      line-height: 1.6;
      color: var(--text-secondary);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      width: 100%;
    }

    .sentiment-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      padding: 4px 12px;
      border-radius: 16px;
      width: fit-content;
      max-width: 100%;
      box-sizing: border-box;

      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &.positive {
        background-color: #e6f4ea;
        color: #1e8e3e;
      }

      &.negative {
        background-color: #fce8e6;
        color: #d93025;
      }

      &.neutral {
        background-color: #f1f3f4;
        color: #5f6368;
      }

      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
      }
    }

    mat-card-actions {
      padding: 16px;
      border-top: 1px solid var(--border-color);
      margin: 0;
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;

      button {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
        max-width: 100%;
        overflow: hidden;

        mat-icon {
          flex-shrink: 0;
        }
      }
    }
  `]
})
export class NewsCardComponent implements OnInit {
  @Input() article!: Article;
  imageUrl: string = '';
  hasValidImage: boolean = false;

  constructor() {
    console.log('NewsCardComponent constructor called');
  }

  ngOnInit(): void {
    console.log('NewsCardComponent ngOnInit called, article:', this.article);
    this.setupImage();
  }

  private setupImage(): void {
    if (this.article.images && this.article.images.length > 0) {
      const imageUrl = this.article.images[0];
      console.log('Trying image URL:', imageUrl);
      
      // Check if the URL is valid
      if (this.isValidUrl(imageUrl)) {
        this.imageUrl = imageUrl;
        this.hasValidImage = true;
      } else {
        console.warn('Invalid image URL:', imageUrl);
        this.hasValidImage = false;
      }
    } else {
      console.log('No images available for article:', this.article.title);
      this.hasValidImage = false;
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  handleImageError(): void {
    console.error('Image failed to load:', this.imageUrl);
    this.hasValidImage = false;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getSentimentClass(score: number): string {
    if (score > 0.3) return 'positive';
    if (score < -0.3) return 'negative';
    return 'neutral';
  }

  getSentimentIcon(score: number): string {
    if (score > 0.3) return 'sentiment_very_satisfied';
    if (score < -0.3) return 'sentiment_very_dissatisfied';
    return 'sentiment_neutral';
  }

  getSentimentText(score: number): string {
    if (score > 0.3) return 'Positive';
    if (score < -0.3) return 'Negative';
    return 'Neutral';
  }

  openArticle(url: string): void {
    window.open(url, '_blank');
  }
}
