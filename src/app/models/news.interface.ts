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
  images: string[];
  affectedEntities: string[];
} 