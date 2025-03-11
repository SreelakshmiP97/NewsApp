export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  url: string;
  source: string;
  topic: string;
  publishedAt: string;
  sentimentScore: number;
  sentimentLabel: string;
  images: string[];
  affectedEntities: string[];
}

export enum NewsCategory {
  TECHNOLOGY = 'Technology',
  BUSINESS = 'Business',
  POLITICS = 'Politics',
  SCIENCE = 'Science',
  HEALTH = 'Health',
  SPORTS = 'Sports',
  ENTERTAINMENT = 'Entertainment',
  WORLD = 'World News',
  ENVIRONMENT = 'Environment',
  EDUCATION = 'Education'
}

export enum NewsSource {
  BBC = 'BBC News',
  CNN = 'CNN',
  REUTERS = 'Reuters',
  AP = 'Associated Press',
  BLOOMBERG = 'Bloomberg',
  TECHCRUNCH = 'TechCrunch',
  VERGE = 'The Verge',
  NYT = 'New York Times',
  GUARDIAN = 'The Guardian',
  WSJ = 'Wall Street Journal'
}

export interface NewsFilter {
  categories: NewsCategory[];
  sources: NewsSource[];
  startDate?: Date;
  endDate?: Date;
} 