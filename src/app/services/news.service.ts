import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { NewsArticle } from '../models/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://news-app-api-theta.vercel.app/api/news';

  constructor(private http: HttpClient) {
    console.log('NewsService constructor called');
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getNews(): Observable<NewsArticle[]> {
    console.log('NewsService getNews called with URL:', `${this.apiUrl}/all`);
    return this.http.get<NewsArticle[]>(`${this.apiUrl}/all`).pipe(
      tap(articles => {
        console.log('Raw API response:', articles);
        if (!articles || articles.length === 0) {
          console.warn('No articles received from API');
        }
        articles?.forEach(article => {
          if (!article.images || article.images.length === 0) {
            console.warn('Article missing images:', article.title);
          } else {
            console.log('Article images:', article.title, article.images);
          }
        });
      }),
      map(articles => articles?.map(article => ({
        ...article,
        images: article.images || []
      })) || []),
      catchError(this.handleError)
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
