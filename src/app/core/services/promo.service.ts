import { Injectable } from '@angular/core';
import { PROMO_MOCK } from '../../mocks/promo';
import { Promo } from '../../shared/models/promo';

@Injectable({
  providedIn: 'root',
})
export class PromoService {
  promos: Promo[] = PROMO_MOCK;

  getAll(): Promo[] {
    return this.promos;
  }
}
