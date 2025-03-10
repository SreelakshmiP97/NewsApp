import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: 'news',
    loadComponent: () => import('./components/news-list/news-list.component').then(m => m.NewsListComponent)
  },
  {
    path: 'bookmarks',
    loadComponent: () => import('./components/bookmarks/bookmarks.component').then(m => m.BookmarksComponent)
  }
];
