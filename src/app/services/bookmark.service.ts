import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewsArticle } from '../models/news.interface';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private readonly STORAGE_KEY = 'bookmarked_articles';
  private bookmarkedArticles: NewsArticle[] = [];
  private bookmarksSubject = new BehaviorSubject<NewsArticle[]>([]);

  constructor() {
    this.loadBookmarks();
  }

  private loadBookmarks(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.bookmarkedArticles = JSON.parse(saved);
      this.bookmarksSubject.next(this.bookmarkedArticles);
    }
  }

  private saveBookmarks(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.bookmarkedArticles));
    this.bookmarksSubject.next(this.bookmarkedArticles);
  }

  getBookmarks(): Observable<NewsArticle[]> {
    return this.bookmarksSubject.asObservable();
  }

  addBookmark(article: NewsArticle): void {
    if (!this.isBookmarked(article)) {
      this.bookmarkedArticles.push(article);
      this.saveBookmarks();
    }
  }

  removeBookmark(article: NewsArticle): void {
    const index = this.bookmarkedArticles.findIndex(a => a.id === article.id);
    if (index !== -1) {
      this.bookmarkedArticles.splice(index, 1);
      this.saveBookmarks();
    }
  }

  isBookmarked(article: NewsArticle): boolean {
    return this.bookmarkedArticles.some(a => a.id === article.id);
  }

  toggleBookmark(article: NewsArticle): void {
    if (this.isBookmarked(article)) {
      this.removeBookmark(article);
    } else {
      this.addBookmark(article);
    }
  }
} 