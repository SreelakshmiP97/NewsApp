import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { NewsCategory, NewsSource, NewsFilter } from '../../models/news.interface';

@Component({
  selector: 'app-news-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
    MatDividerModule
  ],
  template: `
    <mat-accordion class="filters-accordion">
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>Categories</mat-panel-title>
        </mat-expansion-panel-header>
        
        <div class="checkbox-list">
          <mat-checkbox 
            *ngFor="let category of categories" 
            [(ngModel)]="selectedCategories[category]"
            (change)="updateFilters()"
          >
            {{ category }}
          </mat-checkbox>
        </div>
      </mat-expansion-panel>

      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>Sources</mat-panel-title>
        </mat-expansion-panel-header>
        
        <div class="checkbox-list">
          <mat-checkbox 
            *ngFor="let source of sources" 
            [(ngModel)]="selectedSources[source]"
            (change)="updateFilters()"
          >
            {{ source }}
          </mat-checkbox>
        </div>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: [`
    .filters-accordion {
      .mat-expansion-panel {
        background-color: transparent;
        box-shadow: none;
        border-radius: 0;
        
        &:not(:last-child) {
          border-bottom: 1px solid var(--mat-divider-color);
        }
      }

      .mat-expansion-panel-header {
        padding: 16px 0;
        
        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
      }
    }

    .checkbox-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0 16px;

      .mat-checkbox {
        font-size: 14px;
      }
    }
  `]
})
export class NewsFilterComponent {
  @Output() filterChange = new EventEmitter<NewsFilter>();

  categories = Object.values(NewsCategory);
  sources = Object.values(NewsSource);

  selectedCategories: { [key: string]: boolean } = {};
  selectedSources: { [key: string]: boolean } = {};

  constructor() {
    // Initialize all checkboxes to false
    this.categories.forEach(category => this.selectedCategories[category] = false);
    this.sources.forEach(source => this.selectedSources[source] = false);
  }

  updateFilters() {
    const selectedCategories = Object.entries(this.selectedCategories)
      .filter(([_, isSelected]) => isSelected)
      .map(([category]) => category as NewsCategory);

    const selectedSources = Object.entries(this.selectedSources)
      .filter(([_, isSelected]) => isSelected)
      .map(([source]) => source as NewsSource);

    this.filterChange.emit({
      categories: selectedCategories,
      sources: selectedSources
    });
  }
} 