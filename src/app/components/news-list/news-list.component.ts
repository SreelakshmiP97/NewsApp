import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewsCardComponent } from '../news-card/news-card.component';
import { NewsService } from '../../services/news.service';
import { NewsArticle } from '../../models/news.interface';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface FeaturedSlide {
  title: string;
  description: string;
  image: string;
  date: string;
  source: string;
}

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    NewsCardComponent,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <div class="news-list-container">
      <div class="filters">
        <mat-form-field>
          <mat-label>Filter by Topic</mat-label>
          <mat-select [(ngModel)]="selectedTopic" (selectionChange)="applyFilters()">
            <mat-option value="">All Topics</mat-option>
            <mat-option *ngFor="let topic of topics" [value]="topic">{{topic}}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Filter by Source</mat-label>
          <mat-select [(ngModel)]="selectedSource" (selectionChange)="applyFilters()">
            <mat-option value="">All Sources</mat-option>
            <mat-option *ngFor="let source of sources" [value]="source">{{source}}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Search News</mat-label>
          <input matInput [(ngModel)]="searchQuery" (ngModelChange)="applyFilters()" placeholder="Search by title or summary">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>



      <div *ngIf="isLoading" class="loading-container">
        <mat-spinner diameter="40"></mat-spinner>
        <p>Loading news articles...</p>
      </div>

      <div *ngIf="error" class="error-container">
        <mat-icon>error</mat-icon>
        <p>{{ error }}</p>
        <button mat-raised-button color="primary" (click)="loadNews()">Try Again</button>
      </div>

      <div class="news-grid" *ngIf="!isLoading && !error">
        <app-news-card 
          *ngFor="let article of filteredArticles" 
          [article]="article"
          class="news-card-item"
        ></app-news-card>
      </div>

      <div *ngIf="!isLoading && !error && filteredArticles.length === 0" class="no-results">
        <mat-icon>search_off</mat-icon>
        <p>No articles found matching your criteria.</p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    .news-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
      box-sizing: border-box;
      overflow: hidden;
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      width: 100%;
      box-sizing: border-box;

      mat-form-field {
        flex: 1;
        min-width: 200px;
        max-width: 100%;
      }
    }

    .date-filter-section {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .date-range-label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      color: var(--mat-primary-color);
      font-weight: 500;

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }

    .date-filters {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .date-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }

    .date-separator {
      color: var(--mat-card-subtitle-text-color);
      margin: 0 4px;
      font-size: 14px;
    }

    mat-form-field {
      &.mat-mdc-form-field {
        width: 160px;
      }
    }

    .clear-dates-btn {
      height: 40px;
      padding: 0 16px;
      white-space: nowrap;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        margin-right: 4px;
      }
    }

    .news-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }

    .news-card-item {
      width: 100%;
      display: block;
      min-width: 0;
      box-sizing: border-box;
    }

    .loading-container,
    .error-container,
    .no-results {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      text-align: center;
      background-color: var(--surface-color);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      margin: 2rem 0;
      width: 100%;
      box-sizing: border-box;

      mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        margin-bottom: 1rem;
        color: var(--primary-color);
      }

      p {
        margin: 0.5rem 0;
        color: var(--text-secondary);
        font-size: 1.1rem;
      }

      button {
        margin-top: 1rem;
      }
    }

    @media (max-width: 1200px) {
      .news-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
      .news-list-container {
        padding: 16px;
      }

      .filters {
        flex-direction: column;
        gap: 0.5rem;

        mat-form-field {
          width: 100%;
        }
      }

      .news-grid {
        grid-template-columns: minmax(0, 1fr);
        gap: 16px;
      }

      .date-filters {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }

      .date-inputs {
        flex-direction: column;
        gap: 12px;
      }

      .date-separator {
        display: none;
      }

      mat-form-field {
        &.mat-mdc-form-field {
          width: 100%;
        }
      }

      .clear-dates-btn {
        width: 100%;
      }
    }
  `]
})
export class NewsListComponent implements OnInit, OnDestroy {
  articles: NewsArticle[] = [];
  filteredArticles: NewsArticle[] = [];
  topics: string[] = [];
  sources: string[] = [];
  selectedTopic: string = '';
  selectedSource: string = '';
  searchQuery: string = '';
  isLoading: boolean = true;
  error: string | null = null;
  cols: number = 1;
  startDate: Date | null = null;
  endDate: Date | null = null;

  // Featured carousel properties
  featuredSlides: FeaturedSlide[] = [];
  currentSlide = 0;
  private slideInterval: any;

  constructor(
    private newsService: NewsService,
    private snackBar: MatSnackBar
  ) {
    console.log('NewsListComponent constructor called');
    this.updateGridCols(window.innerWidth);
  }

  ngOnInit(): void {
    console.log('NewsListComponent ngOnInit called');
    this.loadNews();
    window.addEventListener('resize', () => this.updateGridCols(window.innerWidth));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', () => this.updateGridCols(window.innerWidth));
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  private updateGridCols(width: number): void {
    if (width < 600) {
      this.cols = 1;
    } else if (width < 960) {
      this.cols = 2;
    } else {
      this.cols = 3;
    }
    console.log('Grid columns updated to:', this.cols);
  }

  loadNews(): void {
    console.log('loadNews called');
    this.isLoading = true;
    this.error = null;

    this.newsService.getNews().pipe(
      catchError(error => {
        console.error('Error loading news:', error);
        this.error = 'Failed to load news articles. Please try again later.';
        this.snackBar.open('Error loading news articles', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        return of([]);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(articles => {
      console.log('Received articles in component:', articles);
      this.articles = articles;
      this.filteredArticles = articles;
      this.topics = [...new Set(articles.map(article => article.topic))];
      this.sources = [...new Set(articles.map(article => article.source))];
      console.log('Topics:', this.topics);
      console.log('Sources:', this.sources);
      this.setupFeaturedSlides();
      this.filterNewsByDate();
    });
  }

  private setupFeaturedSlides(): void {
    // Get the first 5 articles for featured slides
    this.featuredSlides = this.articles.slice(0, 5).map(article => ({
      title: article.title,
      description: article.summary,
      image: article.images[0] || 'assets/default-news.jpg',
      date: new Date(article.publishedAt).toLocaleDateString(),
      source: article.source
    }));

    // Start auto-sliding
    this.startAutoSlide();
  }

  private startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  applyFilters(): void {
    console.log('Applying filters...');
    this.filteredArticles = this.articles.filter(article => {
      const matchesTopic = !this.selectedTopic || article.topic === this.selectedTopic;
      const matchesSource = !this.selectedSource || article.source === this.selectedSource;
      const matchesSearch = !this.searchQuery || 
        article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return matchesTopic && matchesSource && matchesSearch;
    });
    console.log('Filtered articles:', this.filteredArticles);
  }

  // Carousel navigation methods
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.featuredSlides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.featuredSlides.length) % this.featuredSlides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  filterNewsByDate() {
    if (!this.startDate && !this.endDate) {
      this.filteredArticles = this.articles;
      return;
    }

    this.filteredArticles = this.articles.filter(article => {
      const articleDate = new Date(article.publishedAt);
      
      if (this.startDate && this.endDate) {
        return articleDate >= this.startDate && articleDate <= this.endDate;
      } else if (this.startDate) {
        return articleDate >= this.startDate;
      } else if (this.endDate) {
        return articleDate <= this.endDate;
      }
      
      return true;
    });
  }

  clearDateFilters() {
    this.startDate = null;
    this.endDate = null;
    this.filterNewsByDate();
  }
}
