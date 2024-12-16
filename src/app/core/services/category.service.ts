import { Injectable } from '@angular/core';
import { CATEGORY_MOCK } from '../../mocks/category';
import { Category } from '../../shared/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: Category[] = CATEGORY_MOCK;

  getAll(): Category[] {
    return this.categories;
  }
}
