import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsArticle } from '../models/news.interface';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private mockArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Global Climate Summit Reaches Historic Agreement',
      summary: 'World leaders have reached a groundbreaking agreement on climate change, setting ambitious targets for carbon reduction.',
      content: 'In a historic moment for environmental policy, world leaders gathered at the Global Climate Summit have reached a comprehensive agreement on climate change. The landmark deal sets ambitious targets for carbon reduction and establishes a framework for international cooperation on environmental initiatives.',
      url: 'https://example.com/climate-summit',
      source: 'Global News',
      topic: 'Environment',
      publishedAt: '2024-03-15T10:00:00Z',
      sentimentScore: 0.8,
      images: [
        'https://picsum.photos/800/400?random=1',
        'https://picsum.photos/800/400?random=2',
        'https://picsum.photos/800/400?random=3'
      ],
      affectedEntities: ['Global Community', 'Environmental Organizations', 'Government Agencies']
    },
    {
      id: '2',
      title: 'Tech Giant Announces Revolutionary AI Breakthrough',
      summary: 'A major technology company has unveiled a new artificial intelligence system that promises to transform multiple industries.',
      content: 'In a groundbreaking announcement, a leading technology company has unveiled its latest artificial intelligence system. The new AI platform demonstrates unprecedented capabilities in natural language processing and decision-making, potentially revolutionizing various sectors including healthcare, finance, and transportation.',
      url: 'https://example.com/ai-breakthrough',
      source: 'Tech Daily',
      topic: 'Technology',
      publishedAt: '2024-03-14T15:30:00Z',
      sentimentScore: 0.6,
      images: [
        'https://picsum.photos/800/400?random=4',
        'https://picsum.photos/800/400?random=5'
      ],
      affectedEntities: ['Healthcare Industry', 'Financial Sector', 'Transportation Companies']
    },
    {
      id: '3',
      title: 'Economic Recovery Shows Strong Momentum',
      summary: 'Latest economic indicators suggest a robust recovery with significant growth in key sectors.',
      content: 'Recent economic data has revealed strong signs of recovery across multiple sectors. Key indicators show sustained growth in manufacturing, services, and consumer spending, suggesting a robust economic rebound following recent challenges.',
      url: 'https://example.com/economic-recovery',
      source: 'Financial Times',
      topic: 'Economy',
      publishedAt: '2024-03-13T09:15:00Z',
      sentimentScore: 0.4,
      images: [
        'https://picsum.photos/800/400?random=6',
        'https://picsum.photos/800/400?random=7',
        'https://picsum.photos/800/400?random=8'
      ],
      affectedEntities: ['Manufacturing Sector', 'Service Industry', 'Consumers']
    }
  ];

  constructor() {
    console.log('MockDataService constructor called');
  }

  getArticles(): Observable<NewsArticle[]> {
    console.log('MockDataService getArticles called');
    return of(this.mockArticles);
  }
} 