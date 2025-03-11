import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NewsCategory, NewsSource, NewsFilter } from '../../models/news.interface';

@Component({
  selector: 'app-news-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <mat-accordion class="filters-accordion">
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>Date Range</mat-panel-title>
        </mat-expansion-panel-header>
        
        <div class="date-range-container">
          <mat-form-field appearance="outline" class="date-field">
            <mat-label>Start Date</mat-label>
            <input matInput [matDatepicker]="startPicker" [(ngModel)]="startDate" (dateChange)="updateFilters()">
            <mat-datepicker-toggle matIconSuffix [for]="startPicker"></mat-datepicker-toggle>
            <mat-datepicker #startPicker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="date-field">
            <mat-label>End Date</mat-label>
            <input matInput [matDatepicker]="endPicker" [(ngModel)]="endDate" (dateChange)="updateFilters()">
            <mat-datepicker-toggle matIconSuffix [for]="endPicker"></mat-datepicker-toggle>
            <mat-datepicker #endPicker></mat-datepicker>
          </mat-form-field>
        </div>
      </mat-expansion-panel>

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

    .date-range-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }

    .date-field {
      width: 100%;
    }

    ::ng-deep {
      .mat-expansion-panel-body {
        padding: 0 16px 16px !important;
      }

      .mat-form-field-wrapper {
        margin: 0;
        padding: 0;
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
  startDate: Date | null = null;
  endDate: Date | null = null;

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
      sources: selectedSources,
      startDate: this.startDate || undefined,
      endDate: this.endDate || undefined
    });
  }
} 