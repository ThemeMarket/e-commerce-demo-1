import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-layout',
  imports: [SidebarComponent, FormsModule],
  templateUrl: './products-layout.component.html',
})
export class ProductsLayoutComponent {
  router = inject(Router);

  searchTerm = '';

  search() {
    if (this.searchTerm) {
      this.router.navigate([], {
        queryParams: { searchTerm: this.searchTerm },
        queryParamsHandling: 'merge',
      });
    }
  }
}
