import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-layout',
  imports: [SidebarComponent, FormsModule],
  templateUrl: './products-layout.component.html',
})
export class ProductsLayoutComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);

  searchTerm = '';

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const searchTerm = params.get('searchTerm');

      this.searchTerm = searchTerm ?? '';
    });
  }

  search() {
    if (this.searchTerm) {
      this.router.navigate([], {
        queryParams: { searchTerm: this.searchTerm },
        queryParamsHandling: 'merge',
      });
    }
  }
}
