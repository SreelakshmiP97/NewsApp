import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NewsArticle } from '../models/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://news-app-api-theta.vercel.app/api/news';

  constructor(private http: HttpClient) {
    console.log('NewsService constructor called');
  }

  getNews(): Observable<NewsArticle[]> {
    console.log('NewsService getNews called');
    return this.http.get<NewsArticle[]>(`${this.apiUrl}/all`).pipe(
      tap(articles => {
        console.log('Raw API response:', articles);
        articles.forEach(article => {
          if (!article.images || article.images.length === 0) {
            console.warn('Article missing images:', article.title);
          } else {
            console.log('Article images:', article.title, article.images);
          }
        });
      }),
      map(articles => articles.map(article => ({
        ...article,
        images: article.images || []
      })))
    );
  }

  getNewsBySource(source: string): Observable<NewsArticle[]> {
    return this.http.get<NewsArticle[]>(`${this.apiUrl}/${source.toLowerCase()}`).pipe(
      tap(articles => console.log(`Articles from ${source}:`, articles))
    );
  }

  getSportsNews(): Observable<NewsArticle[]> {
    return this.http.get<NewsArticle[]>(`${this.apiUrl}/thehindu/sports`).pipe(
      tap(articles => console.log('Sports articles:', articles))
    );
  }

  getNewsByTopic(topic: string): Observable<NewsArticle[]> {
    return this.getNews().pipe(
      map(articles => articles.filter(article => article.topic.toLowerCase() === topic.toLowerCase()))
    );
  }
}
